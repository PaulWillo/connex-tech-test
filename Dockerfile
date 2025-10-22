# Stage 1: Build the app
FROM node:20-alpine AS build

# Install make and bash (for Makefile)
RUN apk add --no-cache make bash

WORKDIR /app

# Copy package.json for caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the Nx webapp
RUN npx nx build webapp

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy webapp build to Nginx
COPY --from=build /app/apps/webapp/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
