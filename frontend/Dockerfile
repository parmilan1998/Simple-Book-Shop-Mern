# 1️⃣ Build stage
FROM node:22-alpine AS builder

# Build-time arguments
ARG VITE_API_BASE_URL

# Runtime environment variables
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build  

# 2️⃣ Production stage (serve with nginx)
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Copy built files to nginx html directory
COPY --from=builder /app/dist .

# Optional: custom nginx config (for SPA routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
