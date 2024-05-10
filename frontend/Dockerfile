# Use a Node.js base image with a version >= v18.17.0
FROM node:18-alpine

# Set the working directory
WORKDIR /appfrontend

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port used by the Next.js application
EXPOSE 3000

# Start the Next.js application in development mode
CMD ["npm", "run", "dev"]
