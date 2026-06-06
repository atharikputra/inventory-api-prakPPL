# Stage 1: Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "src/server.js"]
