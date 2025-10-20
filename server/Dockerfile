# Stage 1: Build the application
FROM node:22-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Run the application
FROM node:22-alpine AS runner

# Set working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production

# Create a non-root user to run the application
RUN addgroup -S item && adduser -S itemuser -G item

# Create logs directory and set permissions
RUN mkdir -p /app/logs && chown -R itemuser:item /app/logs
USER itemuser

# Set environment variables
ENV NODE_ENV=production
ENV PORT=6767

# Expose the application port
EXPOSE 6767

# Start the application
CMD ["node", "dist/server.js"]