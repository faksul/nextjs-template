# Quick Start Guide

Get your NextJs project up and running in minutes!

## Automatic Setup (Recommended)

Run the setup script:

```bash
./setup.sh
```

This will:
- Create `.env.local` from `.env.example`
- Start Docker containers (PostgreSQL & MinIO)
- Push the database schema

## Manual Setup

### 1. Environment Setup

```bash
cp .env.example .env.local
```

### 2. Start Services

```bash
bun run docker:up
```

### 3. Initialize Database

```bash
bun run db:push
```

### 4. Create MinIO Bucket

1. Open http://localhost:9001
2. Login with:
   - Username: `minioadmin`
   - Password: `minioadmin123`
3. Create a bucket named `nextjs-uploads`

### 5. Start Development Server

```bash
bun run dev
```

Visit http://localhost:3000 🎉

## Available Services

| Service | URL | Credentials |
|---------|-----|-------------|
| Next.js App | http://localhost:3000 | - |
| PostgreSQL | localhost:5432 | user / password |
| MinIO API | http://localhost:9000 | minioadmin / minioadmin123 |
| MinIO Console | http://localhost:9001 | minioadmin / minioadmin123 |
| Drizzle Studio | Run `bun run db:studio` | - |

## Common Commands

```bash
# Development
bun run dev              # Start dev server
bun run build            # Build for production
bun run start            # Start production server

# Docker
bun run docker:up        # Start containers
bun run docker:down      # Stop containers
bun run docker:logs      # View logs

# Database
bun run db:push          # Push schema (dev)
bun run db:generate      # Generate migrations
bun run db:migrate       # Run migrations
bun run db:studio        # Open Drizzle Studio

# Code Quality
bun run lint             # Run Biome linter
bun run format           # Format code
```

## Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# View logs
bun run docker:logs
```

### MinIO Connection Issues
```bash
# Check if MinIO is running
docker ps | grep minio

# Recreate bucket if needed
# Access console at http://localhost:9001
```

### Reset Everything
```bash
# Stop containers and remove volumes
docker-compose down -v

# Run setup again
./setup.sh
```

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Explore the example auth component in `src/components/example-auth.tsx`
- Add more shadcn/ui components: `bunx --bun shadcn@latest add [component]`
- Configure social auth providers in `src/lib/auth/index.ts`
- Create your first API route in `src/app/api/`

Happy coding! 🚀
