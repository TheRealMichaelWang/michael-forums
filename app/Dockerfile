# Stage 1: Build Stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files first (better caching)
COPY app/package*.json ./
RUN npm install

# Copy the entire project (both app and server for schema access)
COPY . /project

# Set up the app directory
WORKDIR /project/app
RUN npm install

# Accept build arguments for environment variables
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_API_URL

# Set environment variables for the build
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_API_URL=$VITE_API_URL

# Build the application
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine

COPY --from=build /project/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]