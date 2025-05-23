# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /michael_forums

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript
RUN npm run build

# Expose the port app runs on
EXPOSE 4000

# Start the server
CMD ["npm", "start"]