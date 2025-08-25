# HackHub - Vercel Deployment Guide

## Overview
HackHub is a hackathon/event management platform built with Next.js, Prisma, and Clerk authentication.

## Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   Create `apps/web/.env.local` with:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZnVuLWhvcnNlLTQyLmNsZXJrLmFjY291bnRzLmRldiQ
   CLERK_SECRET_KEY=sk_test_XBjkLYri4skFEgazPQeFCEAguRr35ot6OCS9brpiJe
   
   # Database (Supabase PostgreSQL)
   DATABASE_URL=postgresql://postgres:Bjasraj@123@db.sauqgabtqqrwaltjwfrl.supabase.co:5432/postgres
   ```

3. **Generate Prisma client:**
   ```bash
   pnpm --filter=web exec prisma generate
   ```

4. **Set up database (when Supabase is ready):**
   ```bash
   pnpm --filter=web exec prisma db push
   ```

5. **Run development server:**
   ```bash
   pnpm --filter=web dev
   ```

## Deploying to Vercel

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel
- Clerk account set up
- Supabase account and database

### Step 1: Set up Supabase Database
1. Go to [supabase.com](https://supabase.com)
2. Create a new project called `hackhub`
3. Wait for the database to be provisioned
4. Go to Settings → Database → Connection string
5. Copy the URI connection string
6. Make sure the connection string includes your password

### Step 2: Set up Clerk (Already Done!)
✅ Your Clerk is already configured with:
- **Publishable Key**: `pk_test_ZnVuLWhvcnNlLTQyLmNsZXJrLmFjY291bnRzLmRldiQ`
- **Secret Key**: `sk_test_XBjkLYri4skFEgazPQeFCEAguRr35ot6OCS9brpiJe`

### Step 3: Deploy to Vercel
1. Import your GitHub repository to Vercel
2. Set the **Root Directory** to `apps/web` in Vercel project settings
3. Add the following environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZnVuLWhvcnNlLTQyLmNsZXJrLmFjY291bnRzLmRldiQ`
   - `CLERK_SECRET_KEY=sk_test_XBjkLYri4skFEgazPQeFCEAguRr35ot6OCS9brpiJe`
   - `DATABASE_URL=postgresql://postgres:Bjasraj@123@db.sauqgabtqqrwaltjwfrl.supabase.co:5432/postgres`

4. Deploy!

### Step 4: Set up Database Schema
After deployment, you'll need to create the database tables:

1. **Option A: Using Prisma** (Recommended)
   ```bash
   cd apps/web
   pnpm exec prisma db push
   ```

2. **Option B: Using Supabase Dashboard**
   - Go to your Supabase project
   - Navigate to Table Editor
   - Create tables manually based on the schema

### Step 5: Seed Data (Optional)
```bash
cd apps/web
pnpm exec prisma db seed
```

## Current Status
✅ **Local development working** - App runs on http://localhost:3000  
✅ **Clerk authentication configured**  
✅ **PostgreSQL schema ready**  
✅ **Supabase database URL configured**  
⏳ **Database tables need to be created** (when Supabase is ready)

## Features
- User authentication with Clerk
- Event management
- Team creation and management
- Submission tracking
- Leaderboards
- Real-time updates

## Tech Stack
- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Supabase)
- **Authentication:** Clerk
- **Deployment:** Vercel
