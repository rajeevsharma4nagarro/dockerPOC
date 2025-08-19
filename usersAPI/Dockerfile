# Stage 1: build
# Use the official Node.js image as a base
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY server.js ./
COPY ./models ./models
# Install dependencies
RUN npm install


# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /app


# Copy the rest of the application code
# Copy only built files and production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/server.js ./
COPY --from=builder /app/models ./models
COPY --from=builder /app/node_modules ./node_modules

# Expose port 3000 to the outside world
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Default command to run when the container starts
CMD ["node", "server.js"]