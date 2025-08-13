# Stage 1: Use the official Node.js 18 image as a base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# We have REMOVED "RUN npx prisma generate" from here.

# Expose the port the app runs on
EXPOSE 5000

# THIS IS THE FIX:
# Run prisma generate right before starting the server.
# This uses the runtime DATABASE_URL.
CMD ["sh", "-c", "npx prisma generate && node server.js"]