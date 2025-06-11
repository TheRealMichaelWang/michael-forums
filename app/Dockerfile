FROM node:20-alpine

WORKDIR /app

# Copy package files first (for better caching of npm install)
COPY app/package*.json ./
RUN npm install

# Copy the entire project
COPY . /project

# Set up the app directory
WORKDIR /project/app
RUN npm install  # Install frontend dependencies

# Install nodemon globally for development
RUN npm install -g nodemon

# Copy the .env file into the container at runtime
COPY app/.env .env

# Expose the development server port
EXPOSE 5173

# Start the frontend server using nodemon
CMD ["npx", "vite"]