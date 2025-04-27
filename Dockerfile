FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install --legacy-peer-deps

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

# Build the Docker image

# docker build -t brainly .
# Run the Docker container
# docker run -p 3000:3000 my-node-app
# Access the app at http://localhost:3000