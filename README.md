# DanielSolutions Portfolio (Next.js App Router)

This repository is migrated to Next.js App Router with TypeScript, Prisma, Neon Postgres, Cloudinary signed uploads, multi profile routing, and an authenticated admin panel.

## Stack
- Next.js App Router + TypeScript
- Prisma ORM + Neon Postgres
- Cloudinary signed direct uploads
- bcrypt + jose session auth

## Environment variables
Copy `.env.example` to `.env` and set values:

```bash
cp .env.example .env
```

Required:
- `DATABASE_URL` (Neon pooled URL)
- `DIRECT_URL` (Neon direct URL)
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `SESSION_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`

## Neon setup
1. Create a Neon project.
2. Create a Postgres database.
3. Copy pooled URL to `DATABASE_URL` and direct URL to `DIRECT_URL`.

## Cloudinary setup
1. Create a Cloudinary account.
2. Copy cloud name, API key, and API secret into env vars.
3. Client uploads should request signatures from `/api/cloudinary/signature`.

## Install and run locally
```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open:
- Site default: `http://localhost:3000/`
- Admin: `http://localhost:3000/admin/login`

Login with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

## Prisma commands
```bash
npm run db:push
npm run db:migrate
npm run db:seed
npm run db:studio
```

## Build and start
```bash
npm run build
npm run start
```

## Deployment on Vercel
1. Import the repository in Vercel.
2. Add all environment variables from `.env.example`.
3. Ensure database URLs point to Neon production.
4. Deploy.

## Admin capabilities included
- Session based auth and protected `/admin`
- Profile switcher
- Profile editing
- Site content editing
- Project create and delete
- Testimonial create and delete
- Password update
- System status card hitting `/api/health/db`

## Utility examples
- Admin user PATCH API: `/api/admin/users/[id]`
- Standalone script: `npx tsx scripts/update-user-example.ts <id> <new-email>`
