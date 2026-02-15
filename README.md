# Ella's Creative World

A full-stack personal portfolio and blog for Ella (Elnatan Lemma) — an 11-year-old creator who publishes books, poems, artwork, YouTube videos, and blog posts.

Built with Next.js, Prisma, and Tailwind CSS. Features a whimsical purple-lavender theme with kawaii bear, star, and cloud decorations.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma 7 with `@prisma/adapter-pg`
- **Auth:** NextAuth v5 (Credentials)
- **File Storage:** Vercel Blob
- **Rich Text Editor:** Tiptap
- **Styling:** Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Supabase free tier recommended)

### Setup

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (from Supabase) |
| `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Site URL (`http://localhost:3000` for local dev) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (auto-populated on Vercel) |

3. Generate Prisma client and run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

4. Seed the database:

```bash
npx prisma db seed
```

5. Start the dev server:

```bash
npm run dev
```

### Default Admin Credentials

- **Email:** ella@example.com
- **Password:** ellaadmin123

## Deployment (Vercel)

1. Push to GitHub
2. Connect repository to Vercel
3. Add Vercel Blob storage (auto-populates `BLOB_READ_WRITE_TOKEN`)
4. Set environment variables: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
5. Set build command: `prisma generate && next build`
6. Deploy, then seed the database once: `npx prisma db seed`

## Project Structure

```
src/
  app/           # Next.js App Router pages
    admin/       # Admin dashboard & CRUD pages
    api/         # REST API routes
    books/       # Public book pages
    poems/       # Public poem pages
    artwork/     # Public artwork gallery
    videos/      # Public video pages
    blog/        # Public blog pages
    about/       # About page
  components/
    admin/       # Admin form components
    content/     # Content card components
    decorations/ # Decorative SVG components
    layout/      # Navbar, Footer, Sidebar
    ui/          # Reusable UI primitives
  lib/           # Utilities, Prisma client, auth, validations
  generated/     # Prisma generated client (gitignored)
prisma/
  schema.prisma  # Database schema
  seed.ts        # Seed data
```
