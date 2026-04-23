# Use Node.js base image
FROM node:22-alpine AS builder

# Add compatibility for modern build tools and native modules
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy lockfile and ALL package definitions for workspace resolution
COPY package.json package-lock.json ./
COPY apps/ ./apps/
COPY packages/ ./packages/
RUN find apps packages -type f ! -name "package.json" -delete

# Install dependencies (ensuring devDependencies are included despite environment settings)
ENV NODE_ENV=development
RUN npm install --include=dev

# Copy the rest of the source
COPY . .

# Build the Next.js app with verbose error reporting
WORKDIR /app
ENV INTERNAL_API_URL=http://api:4000
RUN npm run build -w apps/web > build_output.log 2>&1 || (cat build_output.log && exit 1)

# Production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy Next.js standalone output
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder /app/apps/web/.next/standalone ./

EXPOSE 3000

# The standalone output preserves the monorepo structure
CMD ["node", "apps/web/server.js"]
