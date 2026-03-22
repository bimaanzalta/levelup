# LevelUp — LMS for Gaming & Esports

Platform pembelajaran berbasis web untuk game, esports, dan gaming management dengan visual **Retrofuturism** — dark neon aesthetic ala 80s sci-fi.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend + Backend | Nuxt 3 (Nitro) |
| Database | MySQL |
| ORM | Prisma |
| Styling | Tailwind CSS |
| Auth | JWT + bcryptjs |
| Runtime | Node.js + PM2 |
| Web Server | Nginx |

---

## Features (MVP)

- **Authentication** — Register, Login, Logout
- **Course Browsing** — List, filter by category, search
- **Course Detail** — Deskripsi, modul, lesson list
- **Learning Experience** — Video player, sidebar navigasi, mark completed
- **Progress Tracking** — % progress per course, continue learning
- **Quiz / Assessment** — Multiple choice, score, pass/fail
- **Certificate** — Generate setelah course selesai + quiz lulus
- **User Dashboard** — My courses, progress overview
- **Admin CMS** — CRUD course, module, lesson, quiz, kategori, instruktur

---

## Project Structure

```
levelup-class/
├── app/
│   ├── pages/
│   │   ├── index.vue              # Landing page
│   │   ├── courses/
│   │   │   ├── index.vue          # Explore courses
│   │   │   └── [slug].vue         # Course detail
│   │   ├── learn/
│   │   │   └── [courseSlug]/
│   │   │       └── [lessonId].vue # Video player
│   │   ├── auth/
│   │   │   ├── login.vue
│   │   │   └── register.vue
│   │   ├── dashboard/
│   │   │   └── index.vue
│   │   ├── certificate/
│   │   │   └── [courseId].vue
│   │   └── admin/
│   │       ├── index.vue
│   │       └── courses/
│   ├── layouts/
│   │   ├── default.vue            # Main layout (navbar)
│   │   ├── auth.vue               # Centered auth layout
│   │   └── admin.vue              # Admin sidebar layout
│   ├── components/
│   ├── composables/
│   │   ├── useAuth.ts
│   │   └── useCourses.ts
│   └── middleware/
│       ├── auth.ts
│       └── guest.ts
├── server/
│   ├── api/
│   │   ├── auth/                  # login, register, logout, me
│   │   ├── courses/               # list & detail
│   │   ├── lessons/               # mark complete
│   │   ├── progress/              # progress tracking
│   │   ├── quiz/                  # get & submit
│   │   └── certificates/          # get certificate
│   └── utils/
│       └── prisma.ts
├── prisma/
│   └── schema.prisma
├── .env
├── nuxt.config.ts
└── tailwind.config.js
```

---

## Getting Started (Local Dev)

### Prerequisites

- Node.js >= 18
- MySQL >= 8.0
- npm

### 1. Clone & Install

```bash
git clone <repo-url> levelup-class
cd levelup-class
npm install
```

### 2. Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="mysql://root:password@localhost:3306/levelup_db"
JWT_SECRET="your-super-secret-key"
APP_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Database Setup

```bash
# Buat database
mysql -u root -p -e "CREATE DATABASE levelup_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Migrate schema
npx prisma migrate dev --name init

# (Optional) Prisma Studio
npx prisma studio
```

### 4. Run Dev Server

```bash
npm run dev
```

App berjalan di `http://localhost:3000`

---

## Design System — Retrofuturism

```
Primary (Neon Purple) : #7C3AED
Secondary (Cyan)      : #06B6D4
Accent (Green)        : #22C55E
Background            : #0B0F1A
```

Visual elements:
- Glass cards dengan `backdrop-blur`
- Neon glow shadows
- Gradient border effects
- Dot grid background
- Neon hover & pulse animations

---

## Scripts

```bash
npm run dev        # Development server
npm run build      # Build production
npm run preview    # Preview production build
npm run lint       # Lint code
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register user baru |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/courses` | List courses |
| GET | `/api/courses/:slug` | Course detail |
| POST | `/api/lessons/:id/complete` | Mark lesson selesai |
| GET | `/api/progress/:courseId` | Progress course |
| GET | `/api/quiz/:courseId` | Get quiz |
| POST | `/api/quiz/:quizId/submit` | Submit quiz |
| GET | `/api/certificates/:courseId` | Get certificate |

---

## License

MIT


---

## Support

If you find this project helpful, consider supporting the developer:

<div align="center">

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/T6T61WHJPX)
&nbsp;
<a href="https://trakteer.id/bima_anzalta" target="_blank"><img src="https://edge-cdn.trakteer.id/images/embed/trbtn-red-1.png?v=14-05-2025" height="40" style="border:0px;height:40px;" alt="Trakteer Saya"></a>

</div>