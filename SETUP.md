# 🚀 Habesha Services — Setup & Deployment Guide

This guide walks you through getting the app running locally and deploying to Vercel in production.

---

## Project Structure

```
habesha-services/
├── src/
│   ├── app/                          ← Next.js App Router pages
│   │   ├── page.tsx                  ← Homepage
│   │   ├── layout.tsx                ← Root layout (Navbar + Footer)
│   │   ├── globals.css               ← Tailwind + design system
│   │   ├── not-found.tsx             ← 404 page
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   └── callback/route.ts     ← Email confirmation handler
│   │   ├── browse/page.tsx           ← Search & browse listings
│   │   ├── dashboard/page.tsx        ← Manage your listings
│   │   ├── profile/page.tsx          ← Edit profile
│   │   ├── services/
│   │   │   ├── [id]/page.tsx         ← Service detail + reviews
│   │   │   ├── new/page.tsx          ← Create listing
│   │   │   └── edit/[id]/page.tsx    ← Edit listing
│   │   └── provider/[id]/page.tsx    ← Public provider profile
│   ├── components/
│   │   ├── layout/Navbar.tsx
│   │   ├── layout/Footer.tsx
│   │   ├── services/ServiceCard.tsx
│   │   ├── services/ServiceForm.tsx
│   │   ├── services/SearchBar.tsx
│   │   ├── services/DashboardServiceActions.tsx
│   │   └── reviews/ReviewSection.tsx
│   ├── lib/supabase/
│   │   ├── client.ts                 ← Browser client
│   │   └── server.ts                 ← Server client
│   ├── middleware.ts                  ← Route protection
│   └── types/index.ts                ← Types + constants
├── supabase/migrations/
│   └── 001_initial_schema.sql        ← Full DB schema
├── public/                           ← Static files
├── .env.local.example                ← Copy → .env.local
├── vercel.json                       ← Vercel deploy config
└── package.json
```

---

## Step 1 — Install Dependencies

```bash
npm install
```

---

## Step 2 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up for free
2. Click **New Project**, set a name and password, choose a region
3. Wait ~2 minutes for provisioning

---

## Step 3 — Run the Database Migration

1. In your Supabase dashboard → **SQL Editor** → **New query**
2. Open `supabase/migrations/001_initial_schema.sql`
3. Paste the entire file contents into the editor
4. Click **Run**

This creates:
- `profiles`, `categories`, `services`, `reviews` tables
- Row Level Security (RLS) policies on all tables
- Auto-create profile trigger on signup
- `avatars` storage bucket
- Performance indexes

---

## Step 4 — Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Get these from Supabase → **Project Settings** → **API**.

---

## Step 5 — Configure Auth Redirect URLs

In Supabase → **Authentication** → **URL Configuration**:

| Setting | Value |
|---------|-------|
| Site URL | `http://localhost:3000` |
| Redirect URLs | `http://localhost:3000/auth/callback` |

> **Tip for development:** You can also disable email confirmation under  
> Authentication → Settings → toggle off "Enable email confirmations"

---

## Step 6 — Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) ✅

---

## Step 7 — Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/habesha-services.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo

3. Vercel auto-detects Next.js. Add these **Environment Variables** in the Vercel UI:
   ```
   NEXT_PUBLIC_SUPABASE_URL      = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   NEXT_PUBLIC_APP_URL           = https://your-app.vercel.app
   ```

4. Click **Deploy** 🚀

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

Follow the prompts and paste your env vars when asked.

---

## Step 8 — Update Supabase for Production

After your Vercel URL is live, update in Supabase → **Authentication** → **URL Configuration**:

| Setting | Value |
|---------|-------|
| Site URL | `https://your-app.vercel.app` |
| Redirect URLs | `https://your-app.vercel.app/auth/callback` |

---

## Common Issues & Fixes

| Problem | Fix |
|---------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` not set | Copy `.env.local.example` → `.env.local` and fill in values |
| Build fails with TypeScript errors | Run `npm run type-check` locally first |
| Auth redirect doesn't work | Add your URL to Supabase Redirect URLs |
| Images not loading | Verify `*.supabase.co` is in `next.config.ts` remotePatterns |
| "relation does not exist" DB error | Run the migration SQL in Supabase SQL Editor |
| Avatar upload fails | Check the `avatars` storage bucket is public in Supabase Storage |

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Production build (runs type-check + lint) |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint |
| `npm run type-check` | TypeScript check without building |

---

*ሀበሻ — connecting our community, one service at a time.* 🇪🇹
