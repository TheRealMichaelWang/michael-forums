# Stage 1: Build Stage
# Use Node.js image to build our application
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./
RUN npm install

# Copy rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production Stage
# Use nginx to serve the built application
FROM nginx:alpine

# Copy the built files from build stage to nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
