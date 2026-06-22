# Imarat-e-Shariah Karnataka — CMS-Driven Portal

Official website for Imarat-e-Shariah Karnataka with a full CMS-driven admin dashboard. All public content is fetched from the database and can be managed through the admin panel.

## Stack

- **Client:** React 19, Vite, TypeScript, Tailwind CSS v4, wouter, TanStack Query, Framer Motion, Radix UI
- **Server:** Express 5, TypeScript, Drizzle ORM, PostgreSQL, JWT + bcrypt authentication
- **Images:** Cloudinary (URLs stored in database)
- **Deployment:** GitHub Pages (frontend), Render (backend), Supabase/Neon (PostgreSQL)

## Features

### Public Pages (all database-driven)
- **Home** — Hero, stats, ticker, news, leadership, gallery, contact (all from API)
- **Leadership (Emarat)** — Members grouped by section, fetched from database
- **Branches (Shuabaat)** — Departments, judges, branches from database
- **News & Notices** — Full article/notice listing with search and filters

### Admin Panel (`/admin`)
- **JWT Authentication** — Email + password login with bcrypt-hashed passwords
- **Content Management** — CRUD for news, notices, leadership, branches, judges
- **Site Settings CMS** — Hero content, stats, ticker, footer, social links, org description
- **Media Manager** — Upload images via Cloudinary, manage gallery
- **Password Change** — Change admin password from within the panel
- **Contact Inbox** — View and manage contact form submissions

## Project Structure

```
.
├── client/           # React frontend (Vite)
│   └── src/
│       ├── pages/    # Home, Emarat, Shuaba, News, Admin
│       ├── components/ # Navbar, Footer, UI components
│       ├── context/  # AppContext (theme, lang, settings)
│       └── lib/      # API hooks and utilities
├── server/           # Express API + PostgreSQL/Drizzle
│   └── src/
│       ├── routes/   # Auth, admin, news, leadership, branches, settings, gallery, upload
│       ├── db/       # Drizzle schema and connection
│       └── middleware/ # JWT auth middleware
├── .github/workflows/ # GitHub Actions deployment
└── render.yaml       # Render deployment config
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in all required values (see Environment Variables section below).

### 3. Push the database schema

```bash
npm run db:push
```

### 4. Seed the database

```bash
npm run db:seed
```

This creates the admin user and populates initial content.

### 5. Run in development

```bash
npm run dev
```

### 6. Build for production

```bash
npm run build
npm start
```

## Default Admin Credentials

After running the seed script:

| Field    | Value                        |
| -------- | ---------------------------- |
| Email    | admin@imarateshariah.in      |
| Password | Admin@1234                   |

**Change the password immediately after first login.**

## Environment Variables

| Variable                  | Required | Description                                |
| ------------------------- | -------- | ------------------------------------------ |
| `DATABASE_URL`            | Yes      | PostgreSQL connection string               |
| `JWT_SECRET`              | Yes      | Secret for signing JWT tokens              |
| `ADMIN_EMAIL`             | No       | Admin email for seed (default: admin@...)  |
| `ADMIN_PASSWORD`          | No       | Admin password for seed (default: Admin@1234) |
| `CLOUDINARY_CLOUD_NAME`   | No       | Cloudinary cloud name for image uploads    |
| `CLOUDINARY_API_KEY`      | No       | Cloudinary API key                         |
| `CLOUDINARY_API_SECRET`   | No       | Cloudinary API secret                      |
| `PORT`                    | No       | Server port (default: 5000)                |
| `NODE_ENV`                | No       | Environment (default: development)         |
| `LOG_LEVEL`               | No       | Log level (default: info)                  |

## API Routes

| Route                      | Auth     | Description                    |
| -------------------------- | -------- | ------------------------------ |
| `GET /api/healthz`         | No       | Health check                   |
| `POST /api/auth/login`     | No       | Login (returns JWT)            |
| `POST /api/auth/verify`    | JWT      | Verify token                   |
| `POST /api/auth/change-password` | JWT | Change password              |
| `GET /api/settings`        | No       | Public site settings           |
| `GET /api/news`            | No       | Published news articles        |
| `GET /api/notices`         | No       | Published notices              |
| `GET /api/leadership`      | No       | Active leadership members      |
| `GET /api/branches`        | No       | Active branches                |
| `GET /api/judges`          | No       | Active Darul Qaza judges       |
| `GET /api/gallery`         | No       | Gallery images                 |
| `POST /api/contact`        | No       | Submit contact message         |
| `GET/PUT /api/admin/settings` | JWT   | Manage site settings           |
| `CRUD /api/admin/*`        | JWT      | Admin content management       |
| `POST /api/admin/upload/sign` | JWT   | Cloudinary upload signature    |

## Deployment

### Backend (Render)
1. Connect your GitHub repo to Render
2. Use the included `render.yaml` blueprint, or configure manually
3. Set all required environment variables
4. Run `npm run db:push && npm run db:seed` after first deploy

### Frontend (GitHub Pages)
The client builds to `client/dist/`. Configure GitHub Actions to deploy the built files to GitHub Pages, or use the built-in GitHub Pages deployment action.

### Database (Supabase / Neon)
Use the `DATABASE_URL` from your Supabase or Neon project. Run `npm run db:push` to create tables.

## License

MIT
