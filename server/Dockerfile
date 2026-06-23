# Stage 1: Build
FROM node:24-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build) using the lockfile
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runner
FROM node:24-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY package.json package-lock.json ./

# Install only production dependencies using the lockfile
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/infra/db/migrations ./dist/migrations

# Create a non-root user for security and own the app files
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp \
    && chown -R nodeapp:nodeapp /app
USER nodeapp

# Expose the port the app runs on
EXPOSE 3333

# Basic container health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1:3333/docs || exit 1

# Start the application directly with node (proper signal handling, no npm wrapper)
CMD ["node", "dist/server.js"]
