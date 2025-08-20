# syntax=docker/dockerfile:1

FROM node:20-alpine AS base

# ---------------- deps ----------------
FROM base AS deps
WORKDIR /app

# Alpine extras Prisma needs
RUN apk add --no-cache libc6-compat openssl

# Install deps (cache-friendly)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm ci

# Copy Prisma schema and generate client (needs DATABASE_URL)
COPY prisma ./prisma
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
RUN npx prisma generate

# ---------------- builder ----------------
FROM base AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# Build-time envs (required by Next during build)
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG DATABASE_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Bring node_modules and then the source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Re-generate Prisma client inside builder (after full source copied)
RUN npx prisma generate

# Build Next (standalone output)
RUN npm run build

# ---------------- runner ----------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=8080
ENV HOSTNAME=0.0.0.0

# Non-root user
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Public + prisma (optional, but handy)
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Standalone server and static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 8080
CMD ["node", "server.js"]