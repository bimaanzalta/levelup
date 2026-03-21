# 📘 PRODUCT REQUIREMENT DOCUMENT (PRD)

## **LevelUp — LMS for Gaming & Esports Management (MVP)**

---

## 1. 🎯 Product Overview

**LevelUp** adalah platform LMS berbasis web untuk pembelajaran game, esports, dan gaming management dengan experience premium ala MasterClass, dikombinasikan dengan gaya visual **retrofuturism** yang unik dan immersive.

Platform ini memungkinkan user belajar melalui video course terstruktur, melacak progress, menyelesaikan quiz, dan mendapatkan sertifikat.

---

## 2. 🎯 Objectives (MVP Goals)

* Validasi market LMS khusus gaming & esports
* Deliver pengalaman belajar yang clean, cepat, dan engaging
* Menyediakan sistem course end-to-end (admin → user → progress)
* Membangun fondasi scalable untuk fitur future (community, team management, dll)

---

## 3. 👥 Target Users

### Primary

* Gamer (casual → semi-pro)
* Calon pro player
* Content creator gaming

### Secondary

* Coach / analyst
* Esports manager / owner
* Tournament organizer

---

## 4. 🧱 Scope (MVP Only)

### ✅ Included

* Course system (video-based)
* Module & lesson
* Progress tracking
* Quiz sederhana
* Certificate
* Admin CMS

### ❌ Excluded (Phase 2+)

* Subscription/payment
* Live class
* Forum/community
* Team management
* Tournament system

---

## 5. 🧩 Core Features

---

### 5.1 Authentication

**User Story**

* User bisa register dan login

**Features**

* Register (email + password)
* Login
* Logout

**Optional (nice to have)**

* Google login (future)

---

### 5.2 Course Browsing

**User Story**

* User bisa melihat dan mencari course

**Features**

* List course
* Filter by category
* Search course
* Course card:

  * thumbnail
  * title
  * instructor
  * duration
  * level

---

### 5.3 Course Detail

**User Story**

* User bisa melihat detail sebelum belajar

**Features**

* Thumbnail/video preview
* Description
* Instructor info
* List module & lesson
* Total duration
* Level (Beginner/Intermediate/Advanced)
* Button: “Start Learning”

---

### 5.4 Learning Experience (Core)

**User Story**

* User bisa belajar dari video dan lanjut ke lesson berikutnya

**Features**

* Video player
* Sidebar:

  * module
  * lesson list
* Current lesson highlight
* Next / Previous navigation
* Mark lesson as completed
* Auto progress tracking

---

### 5.5 Progress Tracking

**User Story**

* User tahu sudah sejauh mana belajar

**Features**

* % progress per course
* Lesson completed state
* Continue learning button
* Dashboard progress summary

---

### 5.6 Quiz / Assessment

**User Story**

* User bisa menguji pemahaman

**Features**

* Multiple choice
* Score calculation
* Pass / fail status
* Minimal passing score (configurable)

---

### 5.7 Certificate

**User Story**

* User mendapat sertifikat setelah selesai

**Features**

* Generate certificate (simple)
* Download (PDF later, MVP bisa HTML)
* Syarat:

  * semua lesson selesai
  * quiz lulus

---

### 5.8 User Dashboard

**Features**

* Continue learning
* My courses
* Completed courses
* Progress overview

---

### 5.9 Admin CMS

**User Story**

* Admin bisa mengelola konten LMS

**Features**

#### Course

* Create / edit / delete
* Publish / draft

#### Module

* Create module dalam course

#### Lesson

* Create lesson
* Upload video URL
* Set duration

#### Quiz

* Create question
* Multiple choice
* Set answer

#### Category

* Create category

#### Instructor

* CRUD instructor

#### User

* View user list

---

## 6. 🗂️ Data Model (MySQL)

### Users

```
id
name
email
password
role (user/admin)
created_at
```

### Courses

```
id
title
slug
description
thumbnail
level
instructor_id
category_id
status (draft/published)
created_at
```

### Modules

```
id
course_id
title
order
```

### Lessons

```
id
module_id
title
video_url
duration
order
```

### User Progress

```
id
user_id
lesson_id
completed (boolean)
completed_at
```

### Quiz

```
id
course_id
title
```

### Quiz Questions

```
id
quiz_id
question
```

### Quiz Options

```
id
question_id
option_text
is_correct
```

### Quiz Results

```
id
user_id
quiz_id
score
status (pass/fail)
```

### Certificates

```
id
user_id
course_id
issued_at
```

### Categories

```
id
name
```

### Instructors

```
id
name
bio
avatar
```

---

## 7. 🧠 System Architecture

### Stack

* **Frontend + Backend**: Nuxt 3 (Nitro server)
* **Database**: MySQL
* **ORM**: Prisma (recommended)
* **Styling**: Tailwind CSS
* **Deployment**: Nginx + Node (PM2)

---

### Struktur project (Nuxt fullstack)

```
/server
  /api
    auth/
    courses/
    lessons/
    quiz/
    admin/

/pages
/components
/composables
/layouts
/middleware
```

---

## 8. 🎨 UI/UX — Retrofuturism Style

### Visual Direction

* Neon glow (purple, blue, cyan)
* Dark background (almost black)
* Grid futuristic
* Glass + glow effect
* Slight 80s sci-fi vibe

### Tailwind Tokens

```
primary: #7C3AED (neon purple)
secondary: #06B6D4 (cyan)
accent: #22C55E
bg-dark: #0B0F1A
```

### UI Elements

* Glow button
* Gradient border
* Glass card (backdrop blur)
* Neon hover effects
* Futuristic typography

---

## 9. 📱 Key Pages

### Public

* Landing
* Explore Courses
* Course Detail
* Login / Register

### User

* Dashboard
* Course Player
* Certificate

### Admin

* Dashboard
* Courses CRUD
* Lessons CRUD
* Quiz CRUD

---

## 10. 🔄 User Flow

### Flow: Belajar Course

```
Login → Explore → Course Detail → Start Learning →
Watch Lesson → Complete → Next →
Finish All → Quiz → Pass → Certificate
```

---

## 11. 📊 Success Metrics (MVP)

* Conversion (visitor → signup)
* Course completion rate
* Average lesson watched
* Return user rate

---

## 12. ⚠️ Risks

* Over-engineering (jaga tetap MVP)
* Video performance
* UX terlalu berat (retrofuturism harus tetap ringan)

---

## 13. 🚀 Future Roadmap (After MVP)

* Subscription
* Live class
* Community/forum
* Team management
* Esports scrim system
* AI learning assistant
* Skill matchmaking

---

## 14. 🧩 Developer Notes (Important)

* Gunakan SSR + API di Nuxt (Nitro)
* Pisahkan logic:

  * `/server/api` untuk backend
  * composables untuk state
* Gunakan middleware untuk auth
* Gunakan pagination untuk course list
* Optimasi video (pakai external CDN/YouTube dulu)

---

## 15. 💡 MVP Recommendation (VERY IMPORTANT)

Jangan langsung kompleks.

**Start dengan:**

1. Auth
2. Course + Lesson
3. Video player
4. Progress
5. Admin basic

➡️ Baru setelah itu:

* Quiz
* Certificate
