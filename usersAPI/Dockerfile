# Use the official Node.js image as a base
FROM node:22.17.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Default command to run when the container starts
CMD ["node", "server.js"]