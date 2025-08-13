# Stage 1: Build the React app
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app with a lightweight web server
FROM nginx:stable-alpine

# Copy the built files from the 'builder' stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# When the container starts, nginx will serve the files
CMD ["nginx", "-g", "daemon off;"]