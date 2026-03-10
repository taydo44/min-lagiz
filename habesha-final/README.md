# 🇪🇹 Habesha Services

**A production-ready community service marketplace for the Ethiopian and East African diaspora in the United States.**

> Connect skilled Habesha professionals with neighbors who need them — cleaning, tutoring, translation, cooking, and more.

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🔐 Auth | Email/password signup & login via Supabase |
| 👤 Profiles | Name, city, phone, bio, profile photo upload |
| 📋 Listings | Create, edit, delete service listings |
| 🔍 Search | Full-text keyword search + category + city filters |
| ⭐ Reviews | Star ratings + written reviews per service |
| 📊 Dashboard | Manage all listings with live stats |
| 👁️ Provider Pages | Public profile with all services and ratings |
| 📱 Responsive | Mobile-first, works on all screen sizes |
| 🚀 Production | Deployable to Vercel in minutes |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth + DB | Supabase (PostgreSQL + Auth + Storage) |
| Hosting | Vercel |
| Fonts | DM Serif Display + DM Sans |
| Icons | Lucide React |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (check: `node -v`)
- A free [Supabase account](https://supabase.com)
- A free [Vercel account](https://vercel.com) (for deployment)

---

### Step 1 — Clone & Install

```bash
git clone https://github.com/yourname/habesha-services.git
cd habesha-services
npm install
```

---

### Step 2 — Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) → **New Project**
2. Choose a name (e.g. `habesha-services`), set a strong database password, pick a region close to your users
3. Wait ~2 minutes for provisioning

---

### Step 3 — Run the Database Migration

1. In your Supabase dashboard → **SQL Editor** → **New query**
2. Open `supabase/migrations/001_initial_schema.sql` from this project
3. Paste the entire contents → click **Run**

This creates all tables, RLS policies, triggers, indexes, and the avatar storage bucket.

---

### Step 4 — Get Your Supabase Keys

In Supabase → **Project Settings** → **API**:

- Copy `Project URL`
- Copy `anon / public` key

---

### Step 5 — Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### Step 6 — Configure Auth Settings in Supabase

1. **Supabase** → **Authentication** → **URL Configuration**
2. Set **Site URL**: `http://localhost:3000`
3. Add to **Redirect URLs**: `http://localhost:3000/auth/callback`
4. *(Optional for development)* **Authentication** → **Settings** → Toggle off "Enable email confirmations"

---

### Step 7 — Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
habesha-services/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Home page (hero, categories, listings)
│   │   ├── layout.tsx                # Root layout (Navbar + Footer)
│   │   ├── globals.css               # Global styles + Tailwind layers
│   │   ├── not-found.tsx             # 404 page
│   │   ├── auth/
│   │   │   ├── login/page.tsx        # Sign in
│   │   │   ├── signup/page.tsx       # Registration
│   │   │   └── callback/route.ts     # Email confirmation handler
│   │   ├── browse/page.tsx           # Search & browse listings
│   │   ├── dashboard/page.tsx        # User's listing management
│   │   ├── profile/page.tsx          # Edit profile
│   │   ├── services/
│   │   │   ├── [id]/page.tsx         # Service detail + reviews
│   │   │   ├── new/page.tsx          # Create listing
│   │   │   └── edit/[id]/page.tsx    # Edit listing
│   │   └── provider/[id]/page.tsx    # Provider public profile
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Responsive navbar w/ auth state
│   │   │   └── Footer.tsx            # Footer w/ category links
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx       # Listing card (default + compact)
│   │   │   ├── ServiceForm.tsx       # Create/edit form
│   │   │   ├── SearchBar.tsx         # Search + filter component
│   │   │   └── DashboardServiceActions.tsx  # Edit/delete actions
│   │   └── reviews/
│   │       └── ReviewSection.tsx     # Reviews list + write review form
│   │
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts             # Browser Supabase client
│   │       └── server.ts             # Server Supabase client
│   │
│   ├── middleware.ts                  # Route protection + session refresh
│   └── types/index.ts                # TypeScript types + app constants
│
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    # Full database schema
│
├── .env.local.example                # Environment variable template
├── tailwind.config.ts                # Custom color tokens
├── next.config.ts
└── README.md
```

---

## 🗄️ Database Schema

```
auth.users (Supabase managed)
    │
    ├── profiles (1:1)  ← auto-created on signup
    │     user_id, full_name, city, phone, bio, avatar_url, is_provider
    │
    └── services (1:many)
          provider_id, title, description, price, price_type,
          category, city, contact_email, contact_phone, is_active, view_count
          │
          └── reviews (1:many)
                service_id, reviewer_id, rating (1-5), comment
```

**Categories table** (seed data): cleaning, moving, babysitting, translation, tutoring, cooking, handyman, driving, other

**All tables have Row Level Security (RLS)** enabled with appropriate policies.

---

## 🌐 Deploy to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourname/habesha-services.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import your repo
2. Framework preset: **Next.js** (auto-detected)
3. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL     = https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
   NEXT_PUBLIC_APP_URL           = https://your-app.vercel.app
   ```
4. Click **Deploy**

### Step 3 — Update Supabase Auth Settings

After deployment, update in Supabase → Authentication → URL Configuration:
- **Site URL**: `https://your-app.vercel.app`
- **Redirect URLs**: add `https://your-app.vercel.app/auth/callback`

---

## 🔮 Roadmap / Future Features

- [ ] **Stripe integration** — commission-based payments
- [ ] **In-app messaging** — direct chat between users
- [ ] **Push notifications** — for new inquiries
- [ ] **Provider verification badges** — community trust signals
- [ ] **Multilingual UI** — Amharic, Somali, Tigrinya, Oromo
- [ ] **Service bookmarks/favorites**
- [ ] **Admin dashboard** — content moderation
- [ ] **Mobile app** — React Native
- [ ] **Service photos** — image gallery per listing

---

## 🛡️ Security Notes

- All database tables have **Row Level Security (RLS)** enabled
- Users can only edit/delete **their own** services and reviews
- Passwords handled entirely by Supabase Auth (never stored in your DB)
- Input validation on both client and server

---

## 📄 License

MIT — free to use and modify.

---

*ሀበሻ — connecting our community, one service at a time.* 🇪🇹
