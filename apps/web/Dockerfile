# Use Node.js base image
FROM node:22-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy root and all workspace package files
COPY package.json package-lock.json ./
COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/
COPY packages ./packages

# Install dependencies for the entire monorepo
RUN npm install --include=dev

# Copy source
COPY apps/web ./apps/web

# Build the Next.js app
WORKDIR /app/apps/web
ENV INTERNAL_API_URL=http://api:4000
RUN npm run build

# Production image
FROM node:22-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install runtime dependencies
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

# Copy Next.js standalone output
# The standalone output includes all necessary files in the apps/web folder
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static

EXPOSE 3000

# Healthcheck for Coolify - simplified and relaxed
HEALTHCHECK --interval=10s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); })" || exit 1

# Start the server
CMD ["node", "apps/web/server.js"]
