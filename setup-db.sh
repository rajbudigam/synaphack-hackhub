#!/bin/bash
# Database setup script for Vercel deployment

echo "🌱 Seeding the Neon PostgreSQL database..."

# Copy environment variables
cp .env apps/web/.env

# Navigate to the web app directory
cd apps/web

# Seed the database only (schema already pushed)
DATABASE_URL="postgresql://neondb_owner:npg_W8QN4xtDRIrm@ep-winter-credit-a1cva7l1-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" node prisma/seed.mjs

echo "✅ Database seeded successfully!"
