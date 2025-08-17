# Use Node.js 22 Alpine for smaller image size
FROM node:22-alpine

# Build-time arguments
ARG NODE_ENV
ARG PORT
ARG MONGO_URI

# Runtime environment variables
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}
ENV MONGO_URI=${MONGO_URI}

# Set working directory
WORKDIR /app

# Copy only dependency files first (better caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy the rest of the source code
COPY . .

# Build the TypeScript application
RUN yarn build

# Expose the app port
EXPOSE ${PORT}

# Start the application
CMD ["node", "dist/server.js"]
