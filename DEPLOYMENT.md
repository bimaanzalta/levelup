# Deployment Guide — LevelUp

Panduan deployment LevelUp ke server production menggunakan **Nginx + PM2** pada port **3003**.

---

## Prerequisites

- Ubuntu 20.04 / 22.04
- Node.js >= 18
- MySQL >= 8.0
- Nginx
- PM2
- Git

---

## 1. Setup Server

### Install Node.js 18+

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v  # v18.x.x
```

### Install PM2

```bash
sudo npm install -g pm2
```

### Install Nginx

```bash
sudo apt update
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### Install MySQL

```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

---

## 2. Database Setup

```bash
# Login MySQL
sudo mysql -u root -p

# Buat database & user
CREATE DATABASE levelup_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'levelup_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';
GRANT ALL PRIVILEGES ON levelup_db.* TO 'levelup_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 3. Deploy Aplikasi

### Clone Repository

```bash
cd /var/www
sudo git clone <repo-url> levelup-class
sudo chown -R $USER:$USER /var/www/levelup-class
cd /var/www/levelup-class
```

### Install Dependencies

```bash
npm install
```

### Configure Environment

```bash
cp .env.example .env
nano .env
```

Isi `.env` untuk production:

```env
DATABASE_URL="mysql://levelup_user:StrongPassword123!@localhost:3306/levelup_db"
JWT_SECRET="ganti-dengan-random-string-panjang-dan-aman"
APP_URL="https://yourdomain.com"
NODE_ENV="production"
PORT=3003
```

### Migrate & Generate Prisma Client

```bash
# Generate Prisma client (wajib, buat folder .prisma/client/)
npx prisma generate

# Migrate schema ke database
npx prisma migrate deploy
```

### Build Aplikasi

```bash
npm run build
```

---

## 4. Konfigurasi PM2

Buat file `ecosystem.config.cjs` di root project:

```bash
cat > /var/www/levelup-class/ecosystem.config.cjs << 'EOF'
module.exports = {
  apps: [
    {
      name: 'levelup',
      script: '.output/server/index.mjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
        NITRO_PORT: 3003,
        NITRO_HOST: '0.0.0.0',
      },
    },
  ],
}
EOF
```

### Jalankan dengan PM2

```bash
# Start aplikasi
pm2 start ecosystem.config.cjs

# Simpan konfigurasi PM2 (auto-start saat reboot)
pm2 save
pm2 startup

# Ikuti instruksi yang muncul dari pm2 startup, contoh:
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

### Cek Status PM2

```bash
pm2 status
pm2 logs levelup
pm2 monit
```

---

## 5. Konfigurasi Nginx

### Buat Konfigurasi Site

```bash
sudo nano /etc/nginx/sites-available/levelup
```

Isi dengan:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    location / {
        proxy_pass http://127.0.0.1:3003;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 60s;
    }

    # Static assets caching
    location /_nuxt/ {
        proxy_pass http://127.0.0.1:3003;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

### Aktifkan Site

```bash
sudo ln -s /etc/nginx/sites-available/levelup /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. SSL dengan Certbot (HTTPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

---

## 7. Deployment Update (Rolling Update)

Untuk update aplikasi tanpa downtime:

```bash
cd /var/www/levelup-class

# Pull kode terbaru
git pull origin main

# Install dependency baru (jika ada)
npm install

# Generate Prisma client (wajib setiap deploy)
npx prisma generate

# Migrate database (jika ada perubahan schema)
npx prisma migrate deploy

# Build ulang
npm run build

# Restart PM2 dengan reload (zero downtime)
pm2 reload levelup
```

---

## 8. Monitoring & Logs

```bash
# Lihat log real-time
pm2 logs levelup --lines 100

# Status semua process
pm2 status

# Monitor CPU/Memory
pm2 monit

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 9. Firewall (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

> Port 3003 TIDAK perlu dibuka ke publik karena Nginx yang menjadi proxy-nya.

---

## 10. Checklist Deployment

- [ ] Node.js >= 18 terinstall
- [ ] MySQL running & database `levelup_db` dibuat
- [ ] `.env` dikonfigurasi dengan nilai production
- [ ] `npx prisma generate` berhasil
- [ ] `npx prisma migrate deploy` berhasil
- [ ] `npm run build` berhasil
- [ ] PM2 menjalankan app di port 3003
- [ ] Nginx dikonfigurasi dan reload berhasil
- [ ] `pm2 save` + `pm2 startup` dijalankan
- [ ] SSL certificate terpasang (Certbot)
- [ ] Firewall aktif

---

## Troubleshooting

### App tidak bisa start
```bash
pm2 logs levelup --err
# Cek apakah port 3003 sudah dipakai
sudo lsof -i :3003
```

### Database connection error
```bash
# Test koneksi
mysql -u levelup_user -p levelup_db
# Pastikan DATABASE_URL di .env benar
```

### Nginx 502 Bad Gateway
```bash
# Pastikan app PM2 running
pm2 status
# Cek nginx error log
sudo tail -f /var/log/nginx/error.log
```

### Build error
```bash
# Hapus cache dan build ulang
rm -rf .output .nuxt node_modules/.cache
npm run build
```
