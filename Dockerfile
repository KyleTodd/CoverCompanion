# Use an official Node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Dev only -- Install nodemon
# RUN npm install -g nodemon

# Copy package.json and package-lock.json (or yarn.lock if using Yarn)
COPY package*.json ./

# Install any needed packages
RUN npm install

# Bundle app source inside the Docker image
COPY . .

RUN npm run build

EXPOSE 4173

# Define the command to run your app
CMD ["node", "fserver.js"]
