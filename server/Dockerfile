# Stage 1: Build
FROM node:24-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

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
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy compiled files from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/infra/db/migrations ./dist/migrations

# Create a non-root user for security
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp
USER nodeapp

# Expose the port the app runs on
EXPOSE 3333

# Start the application
CMD ["npm", "start"]
