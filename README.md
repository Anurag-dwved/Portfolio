# Personal Portfolio with Admin Dashboard

A modern, full-stack personal portfolio website with a protected admin panel for content management. Built with Next.js, TypeScript, Prisma, and Tailwind CSS.

## Features

### Public Portfolio
- **Home / Hero** — Name, title, tagline, and social links
- **About Me** — Bio and personal details
- **Skills** — Categorized skills with proficiency bars
- **Projects** — Showcase with tech stack, live demo, and GitHub links
- **Certificates** — Professional certifications and credentials
- **Experience** — Work history timeline
- **Contact** — Contact form and social links

### Admin Dashboard
- Secure login with NextAuth.js (credentials-based)
- Protected routes — only admin can access `/admin/*`
- Full CRUD for projects and certificates
- Manage profile, skills, and experience
- Clean, intuitive UI for content management

### Security
- Public users can **only view** portfolio data (GET requests)
- All write operations (POST, PUT, DELETE) require admin authentication
- Middleware protects admin routes
- Passwords hashed with bcrypt

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** SQLite (via Prisma ORM)
- **Auth:** NextAuth.js with JWT sessions

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
```

Edit `.env` and update:
- `NEXTAUTH_SECRET` — Generate a random string (e.g., `openssl rand -base64 32`)
- `ADMIN_EMAIL` — Your admin login email
- `ADMIN_PASSWORD` — Your admin login password

3. **Set up the database:**

```bash
npm run db:setup
```

This creates the SQLite database and seeds it with sample portfolio data.

4. **Start the development server:**

```bash
npm run dev
```

5. **Open in browser:**
- Portfolio: [http://localhost:3000](http://localhost:3000)
- Admin login: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Default Admin Credentials

After seeding, use the credentials from your `.env` file:
- Email: `admin@example.com` (or your `ADMIN_EMAIL`)
- Password: `changeme123` (or your `ADMIN_PASSWORD`)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Public portfolio
│   ├── admin/                # Admin dashboard pages
│   └── api/                  # API routes
├── components/
│   ├── portfolio/            # Public portfolio components
│   └── admin/                # Admin UI components
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   ├── auth-helpers.ts       # Admin auth middleware
│   └── db.ts                 # Prisma client
└── middleware.ts             # Route protection
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/portfolio` | No | All portfolio data |
| GET | `/api/projects` | No | List projects |
| POST | `/api/projects` | Admin | Create project |
| PUT | `/api/projects/[id]` | Admin | Update project |
| DELETE | `/api/projects/[id]` | Admin | Delete project |
| GET | `/api/certificates` | No | List certificates |
| POST | `/api/certificates` | Admin | Create certificate |
| PUT | `/api/certificates/[id]` | Admin | Update certificate |
| DELETE | `/api/certificates/[id]` | Admin | Delete certificate |

Similar patterns apply for `/api/profile`, `/api/skills`, and `/api/experience`.

## Production Deployment

1. Switch to PostgreSQL by updating `prisma/schema.prisma` datasource
2. Set production environment variables
3. Run `npm run build && npm start`

## License

MIT
