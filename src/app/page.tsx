import { ExampleAuth } from "@/components/example-auth";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">NextJs Starter Template</h1>
            <p className="text-xl text-muted-foreground">
              Full-stack Next.js starter with PostgreSQL, MinIO, Drizzle, and
              Better Auth
            </p>
          </div>

          {/* Tech Stack Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">Next.js 16</h3>
              <p className="text-sm text-muted-foreground">
                App Router with React 19
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">PostgreSQL</h3>
              <p className="text-sm text-muted-foreground">
                Relational database
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">Drizzle ORM</h3>
              <p className="text-sm text-muted-foreground">
                Type-safe database toolkit
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">MinIO (S3)</h3>
              <p className="text-sm text-muted-foreground">Object storage</p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">Better Auth</h3>
              <p className="text-sm text-muted-foreground">
                Authentication solution
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">TanStack Query</h3>
              <p className="text-sm text-muted-foreground">
                Data fetching & caching
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">Tailwind CSS</h3>
              <p className="text-sm text-muted-foreground">
                Utility-first styling
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">shadcn/ui</h3>
              <p className="text-sm text-muted-foreground">
                Beautiful components
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
              <h3 className="font-semibold mb-2">Biome</h3>
              <p className="text-sm text-muted-foreground">
                Fast linting & formatting
              </p>
            </div>
          </div>

          {/* Example Auth Component */}
          <div className="flex justify-center">
            <ExampleAuth />
          </div>

          {/* Getting Started */}
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <ol className="space-y-2 text-muted-foreground">
              <li>
                Start Docker services:{" "}
                <code className="px-2 py-1 bg-muted rounded text-sm">
                  bun run docker:up
                </code>
              </li>
              <li>
                Push database schema:{" "}
                <code className="px-2 py-1 bg-muted rounded text-sm">
                  bun run db:push
                </code>
              </li>
              <li>
                Create MinIO bucket at{" "}
                <a
                  href="http://localhost:9001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  localhost:9001
                </a>
              </li>
              <li>Check the README.md for detailed instructions</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
