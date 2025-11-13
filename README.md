# NextJs Template

A Next.js project with PostgreSQL, MinIO (S3), Drizzle ORM, Better Auth, and TanStack Query.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: PostgreSQL with Drizzle ORM
- **Storage**: MinIO (S3-compatible)
- **Authentication**: Better Auth
- **State Management**: TanStack Query
- **Linting & Formatting**: Biome
- **Package Manager**: Bun

## Prerequisites

- [Bun](https://bun.sh) installed
- [Docker](https://www.docker.com/) and Docker Compose installed

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Start Docker Services

Start PostgreSQL and MinIO containers:

```bash
bun run docker:up
```

This will start:
- **PostgreSQL** on `localhost:5432`
- **MinIO API** on `localhost:9000`
- **MinIO Console** on `localhost:9001`

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration. For development, the default values should work.

**Important**: Change `BETTER_AUTH_SECRET` in production!

### 4. Initialize the Database

Generate and push the database schema:

```bash
bun run db:push
```

Or use migrations:

```bash
bun run db:generate
bun run db:migrate
```

### 5. Create MinIO Bucket

Access MinIO Console at `http://localhost:9001`:
- Username: `minioadmin`
- Password: `minioadmin123`

Create a bucket named `nextjs-uploads` (or whatever you set in `S3_BUCKET_NAME`).

### 6. Start Development Server

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server

### Database
- `bun run db:generate` - Generate migrations from schema
- `bun run db:migrate` - Run migrations
- `bun run db:push` - Push schema directly (good for dev)
- `bun run db:studio` - Open Drizzle Studio

### Docker
- `bun run docker:up` - Start containers
- `bun run docker:down` - Stop containers
- `bun run docker:logs` - View container logs

### Code Quality
- `bun run lint` - Run Biome linter
- `bun run format` - Format code with Biome

## Project Structure

```
nextjs-template/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── auth/[...all]/ # Better Auth API routes
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/              # shadcn/ui components
│   ├── lib/
│   │   ├── auth/            # Authentication setup
│   │   ├── db/              # Database setup and schema
│   │   └── s3/              # S3/MinIO client
│   └── providers/           # React providers (Query, etc.)
├── docker-compose.yml       # Docker services configuration
├── drizzle.config.ts        # Drizzle ORM configuration
└── package.json
```

## Authentication

Better Auth is configured with email/password authentication. The auth API is available at `/api/auth/*`.

To use authentication in your components:

```typescript
import { useSession, signIn, signOut } from "@/lib/auth/client";

function MyComponent() {
  const { data: session } = useSession();
  
  // Use session data, signIn, signOut
}
```

## Database

Drizzle ORM is configured with PostgreSQL. Schema is defined in `src/lib/db/schema.ts`.

To query the database:

```typescript
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";

const users = await db.select().from(user);
```

## Storage (S3/MinIO)

S3 client is configured in `src/lib/s3/client.ts`. Use the AWS SDK v3 to interact with MinIO:

```typescript
import { s3Client, S3_BUCKET_NAME } from "@/lib/s3/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

await s3Client.send(new PutObjectCommand({
  Bucket: S3_BUCKET_NAME,
  Key: "file.txt",
  Body: "content",
}));
```

## TanStack Query

TanStack Query is set up globally via the `QueryProvider` in the root layout.

Example usage:

```typescript
import { useQuery } from "@tanstack/react-query";

function MyComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("/api/users");
      return res.json();
    },
  });
}
```

## UI Components

shadcn/ui components are installed. Add more components:

```bash
bunx --bun shadcn@latest add [component-name]
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/local-db` |
| `S3_ENDPOINT` | MinIO endpoint | `http://localhost:9000` |
| `S3_ACCESS_KEY` | MinIO access key | `minioadmin` |
| `S3_SECRET_KEY` | MinIO secret key | `minioadmin123` |
| `S3_BUCKET_NAME` | S3 bucket name | `nextjs-uploads` |
| `S3_REGION` | S3 region | `us-east-1` |
| `BETTER_AUTH_SECRET` | Auth secret key | (must be set) |
| `BETTER_AUTH_URL` | Application URL | `http://localhost:3000` |

## License

MIT
