#!/bin/bash

echo ">>> Setting up project..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo ">>> Creating .env.local from .env.example..."
  cp .env.example .env.local
  echo ">>> .env.local created"
else
  echo ">>>  .env.local already exists"
fi

echo ""
echo ">>> Starting Docker containers..."
bun run docker:up

echo ""
echo ">>> Waiting for PostgreSQL to be ready..."
sleep 5

echo ""
echo ">>>  Pushing database schema..."
bun run db:push

echo ""
echo ">>> Setup complete!"
echo ""
echo ">>> Next steps:"
echo "  1. Access MinIO Console at http://localhost:9001"
echo "     - Username: minioadmin"
echo "     - Password: minioadmin123"
echo "  2. Create a bucket named 'uploads'"
echo "  3. Update BETTER_AUTH_SECRET in .env.local"
echo "  4. Run 'bun run dev' to start the development server"
echo ""
