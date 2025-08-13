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

# Generate the Prisma Client
RUN npx prisma generate

# Expose the port the app runs on
EXPOSE 5000

# THIS IS THE FIX:
# Run the database migration and then start the server.
# "prisma migrate deploy" is the correct command for production environments.
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]