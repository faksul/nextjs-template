# llm.md

This file provides guidance to Ai Model when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Install dependencies
bun install

# Start development server (requires Docker services running)
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

### Docker Services
```bash
# Start PostgreSQL and MinIO containers
bun run docker:up

# Stop containers
bun run docker:down

# View container logs
bun run docker:logs
```

### Database Operations
```bash
# Push schema changes directly to database (development)
bun run db:push

# Generate migration files from schema
bun run db:generate

# Apply migrations to database
bun run db:migrate

# Open Drizzle Studio (database GUI)
bun run db:studio
```

### Code Quality
```bash
# Run Biome linter
bun run lint

# Format code with Biome
bun run format
```

### Testing
Note: No test framework is currently configured. When adding tests, update this section.

## Architecture Overview

### Stack
- **Runtime**: Bun (not Node.js - use `bun` commands, not `npm` or `npx`)
- **Framework**: Next.js 16 with App Router (React 19)
- **Database**: PostgreSQL via Drizzle ORM
- **Storage**: MinIO (S3-compatible object storage)
- **Auth**: Better Auth with Drizzle adapter
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Linting/Formatting**: Biome (not ESLint/Prettier)

### Key Architecture Patterns

#### Database Layer (`src/lib/db/`)
- **Schema Definition**: All tables defined in `schema.ts` using Drizzle ORM
- **Database Client**: Singleton `db` instance exported from `index.ts`
- **Schema Pattern**: Uses Drizzle's `pgTable` with UUID primary keys and timestamps
- **Foreign Keys**: Cascade deletes configured (e.g., sessions delete when user is deleted)
- **Migrations**: Stored in `src/lib/db/migrations/` (generated via `bun run db:generate`)

Current schema includes:
- `user` - User accounts
- `session` - User sessions with IP and user agent tracking
- `account` - OAuth accounts and password hashes
- `verification` - Email verification tokens

#### Authentication (`src/lib/auth/`)
- **Server-side**: `auth` instance in `index.ts` configured with Better Auth
- **Client-side**: `authClient` in `client.ts` with React hooks
- **Integration**: Uses Drizzle adapter connecting to database schema
- **API Routes**: Better Auth handles all routes via `/api/auth/[...all]`
- **Usage Pattern**: Import `useSession`, `signIn`, `signOut` from `@/lib/auth/client`

Social providers can be added in `src/lib/auth/index.ts` under `socialProviders`.

#### Storage Layer (`src/lib/s3/`)
- **Client**: AWS SDK v3 S3Client configured for MinIO
- **Path Style**: Uses `forcePathStyle: true` (required for MinIO)
- **Bucket**: Default bucket name exported as `S3_BUCKET_NAME`
- **Usage**: Import `s3Client` and use AWS SDK v3 commands (`PutObjectCommand`, `GetObjectCommand`, etc.)

#### State Management (`src/providers/`)
- **Query Client**: TanStack Query configured globally with 1-minute stale time
- **Provider**: `QueryProvider` wraps app in root layout
- **Settings**: Window refocus refetching disabled by default

#### UI Components (`src/components/`)
- **shadcn/ui**: Pre-installed components in `ui/` directory
- **Installation**: Use `bunx --bun shadcn@latest add [component]` to add new components
- **Styling**: Components use Tailwind CSS with CSS variables for theming

### File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── auth/[...all]/ # Better Auth catch-all route
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Homepage
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── lib/                  # Core business logic
│   ├── auth/             # Authentication (server + client)
│   ├── db/               # Database client and schema
│   └── s3/               # S3/MinIO client
└── providers/            # React context providers
```

### Important Conventions

#### Path Aliases
- Use `@/` prefix for imports from `src/` directory
- Example: `import { db } from "@/lib/db"`

#### Environment Variables
- Development: Use `.env.local` (not committed)
- Required variables in `.env.example`
- Database: `DATABASE_URL`
- S3: `S3_ENDPOINT`, `S3_ACCESS_KEY`, `S3_SECRET_KEY`, `S3_BUCKET_NAME`
- Auth: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`

#### Database Workflow
1. **Development**: Modify `src/lib/db/schema.ts`, then run `bun run db:push`
2. **Production**: Generate migrations with `bun run db:generate`, commit them, then run `bun run db:migrate`

#### Type Safety
- TypeScript strict mode enabled
- Drizzle provides full type inference for queries
- Better Auth provides typed session data

### Docker Services

**PostgreSQL** (port 5432):
- User: `user`
- Password: `password`
- Database: `local-db`

**MinIO** (ports 9000/9001):
- API: `http://localhost:9000`
- Console: `http://localhost:9001`
- Access Key: `minioadmin`
- Secret: `minioadmin123`
- Manual Setup: Create bucket named `nextjs-uploads` via console

### Common Workflows

#### Adding a New Database Table
1. Add table definition to `src/lib/db/schema.ts`
2. Run `bun run db:push` (dev) or `bun run db:generate` + `bun run db:migrate` (prod)
3. Import table from schema to query: `import { myTable } from "@/lib/db/schema"`

#### Creating an API Route
1. Create file in `src/app/api/[route]/route.ts`
2. Export `GET`, `POST`, etc. as async functions
3. Import `db` for database access, `s3Client` for storage
4. Return `Response` objects or use `NextResponse`

#### Adding Authentication to a Page
1. Import `useSession` from `@/lib/auth/client`
2. Call `const { data: session } = useSession()` in component
3. Check `session?.user` for authenticated user data
4. Use `"use client"` directive for client components

#### File Upload to S3
1. Import `s3Client` and `S3_BUCKET_NAME` from `@/lib/s3/client`
2. Use `PutObjectCommand` from `@aws-sdk/client-s3`
3. Generate signed URLs with `getSignedUrl` for downloads

### Code Quality Standards

- **Formatting**: 2-space indentation (enforced by Biome)
- **Linting**: Biome with recommended rules + Next.js and React domains
- **Imports**: Auto-organized by Biome
- **React**: Follows React 19 patterns (no React.FC, use function components)
- **Server/Client**: Be explicit with `"use client"` and `"use server"` directives

### Quick Setup

If database or services aren't running:
```bash
# Automated setup
./setup.sh

# Or manual setup
bun run docker:up
bun run db:push
# Create MinIO bucket at http://localhost:9001
bun run dev
```
