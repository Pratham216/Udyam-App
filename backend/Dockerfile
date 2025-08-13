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

# Run Prisma generate
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 5000

# The command to run your application
CMD [ "node", "server.js" ]