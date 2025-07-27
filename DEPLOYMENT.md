# 🚀 Full Stack Docker Build and Deployment Guide

## 📋 Overview

This comprehensive guide covers building and deploying both the Node.js + TypeScript backend and React + Vite frontend applications using Docker.

---

# 🚀 Backend Docker Build and Deployment Guide

## 🏗️ Backend Dockerfile Configuration

The backend uses a single-stage Docker build optimized for TypeScript Node.js applications:

### Key Features:

- ✅ Node.js 22 Alpine for smaller image size
- ✅ TypeScript compilation to JavaScript
- ✅ Yarn package manager with frozen lockfile
- ✅ Production environment optimization
- ✅ Proper layer caching for faster builds
- ✅ Colored console output with colors package

## �️ Backend Build Commands

### Local Development Build

```bash
# Navigate to backend directory
cd backend

# Build the Docker image
docker build -t book-shop-backend:latest .

# Run the container with environment variables
docker run -d -p 8082:9000 \
  -e NODE_ENV=development \
  -e PORT=9000 \
  -e MONGO_URI=mongodb+srv://bookLogix:bookLogix@cluster0.ck00j6t.mongodb.net/book_dev \
  book-shop-backend:latest

# Access the API
curl http://localhost:8082/
```

### Using Build Script

```bash
# Make script executable
chmod +x scripts/build-backend.sh

# Build locally
./scripts/build-backend.sh

# Build and push to registry
./scripts/build-backend.sh v1.0.0 mparmilan
```

### Docker Compose

```bash
# Build and run backend with MongoDB
docker-compose up --build backend mongo

# Run production compose
docker-compose -f docker-compose.prod.yml up --build backend
```

## 🌐 Backend Deployment Options

### 1. Docker Hub Deployment

```bash
# Tag for Docker Hub
docker tag book-shop-backend:latest mparmilan/book-shop-backend:latest
docker tag book-shop-backend:latest mparmilan/book-shop-backend:v1.0.0

# Push to Docker Hub
docker push mparmilan/book-shop-backend:latest
docker push mparmilan/book-shop-backend:v1.0.0

# Deploy on production server
docker pull mparmilan/book-shop-backend:latest
docker run -d -p 5000:5000 --env-file .env mparmilan/book-shop-backend:latest
```

### 2. AWS ECS Deployment

```bash
# Login to AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Create repository
aws ecr create-repository --repository-name book-shop-backend

# Tag and push
docker tag book-shop-backend:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/book-shop-backend:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/book-shop-backend:latest
```

### 3. Google Cloud Run

```bash
# Build and tag for GCR
docker tag book-shop-backend:latest gcr.io/your-project-id/book-shop-backend:latest

# Push to GCR
docker push gcr.io/your-project-id/book-shop-backend:latest

# Deploy to Cloud Run
gcloud run deploy book-shop-backend \
  --image gcr.io/your-project-id/book-shop-backend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 5000 \
  --set-env-vars NODE_ENV=production
```

### 4. Heroku Deployment

```bash
# Login to Heroku Container Registry
heroku container:login

# Build and push
heroku container:push web --app your-app-name

# Release the image
heroku container:release web --app your-app-name
```

## 🔧 Backend Environment Configuration

### Development (.env.development)

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://mongo:mongo@localhost:27017/book_dev
```

### Production (.env)

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb://mongo:mongo@mongo:27017/book_prod
```

### Cloud Production (.env.production)

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/book_prod
```

## 🚀 Backend Quick Start Commands

```bash
# Development with local MongoDB
docker-compose up --build backend mongo

# Production
docker-compose -f docker-compose.prod.yml up -d backend

# Build only backend
docker-compose build backend

# View backend logs
docker-compose logs backend

# Scale backend
docker-compose up --scale backend=3
```

## 🔍 Backend Health Checks

```bash
# Check if API is running
curl http://localhost:5000/

# Check API endpoints
curl http://localhost:5000/api/v1/books

# Docker health check
docker ps  # Shows health status
```

## 📊 Backend Performance Optimizations

- **TypeScript compilation** for optimized JavaScript
- **Frozen lockfile** for consistent dependencies
- **Alpine Linux** base image for smaller size
- **Layer caching** for faster rebuilds
- **Production environment** settings

## 🔒 Backend Security Features

- Environment variable isolation
- Production-ready MongoDB connections
- CORS configuration
- Express security middleware ready

---

## 🏗️ Frontend Dockerfile Configuration

The frontend uses a multi-stage Docker build:

1. **Stage 1 (Builder)**: Builds the React app with Node.js and Yarn
2. **Stage 2 (Production)**: Serves the built app with Nginx

### Key Features:

- ✅ Multi-stage build for optimized image size
- ✅ Alpine Linux for smaller footprint
- ✅ Custom Nginx configuration for SPA routing
- ✅ Gzip compression enabled
- ✅ Security headers included
- ✅ Static asset caching
- ✅ Health check endpoint

## 🛠️ Build Commands

### Local Development Build

```bash
# Navigate to frontend directory
cd frontend

# Build the Docker image
docker build -t book-shop-frontend:latest .

# Run the container
docker run -p 8080:80 book-shop-frontend:latest

# Access the app
open http://localhost:8080
```

### Using Build Script

```bash
# Make script executable
chmod +x scripts/build-frontend.sh

# Build locally
./scripts/build-frontend.sh

# Build and push to registry
./scripts/build-frontend.sh v1.0.0 mparmilan
```

### Docker Compose

```bash
# Build and run with docker-compose
docker-compose up --build frontend

# Run production compose
docker-compose -f docker-compose.prod.yml up --build frontend
```

## 🌐 Deployment Options

### 1. Docker Hub Deployment

```bash
# Tag for Docker Hub
docker tag book-shop-frontend:latest mparmilan/book-shop-frontend:latest
docker tag book-shop-frontend:latest mparmilan/book-shop-frontend:v1.0.0

# Push to Docker Hub
docker push mparmilan/book-shop-frontend:latest
docker push mparmilan/book-shop-frontend:v1.0.0

# Deploy on production server
docker pull mparmilan/book-shop-frontend:latest
docker run -d -p 80:80 mparmilan/book-shop-frontend:latest
```

### 2. AWS ECS Deployment

```bash
# Login to AWS ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Create repository
aws ecr create-repository --repository-name book-shop-frontend

# Tag and push
docker tag book-shop-frontend:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/book-shop-frontend:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/book-shop-frontend:latest
```

### 3. Google Cloud Run

```bash
# Build and tag for GCR
docker tag book-shop-frontend:latest gcr.io/your-project-id/book-shop-frontend:latest

# Push to GCR
docker push gcr.io/your-project-id/book-shop-frontend:latest

# Deploy to Cloud Run
gcloud run deploy book-shop-frontend \
  --image gcr.io/your-project-id/book-shop-frontend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 80
```

### 4. Netlify/Vercel Alternative

For static hosting platforms, you can also build and deploy without Docker:

```bash
# Build the app
yarn build

# Deploy to Netlify
netlify deploy --prod --dir=dist

# Deploy to Vercel
vercel --prod
```

## 🔧 Environment Configuration

### Development (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
VITE_APP_NAME=Book Shop
VITE_APP_VERSION=1.0.0
```

### Production (.env.production)

```env
VITE_API_BASE_URL=https://your-api-domain.com/api/v1
VITE_APP_NAME=Book Shop
VITE_APP_VERSION=1.0.0
```

## 🚀 Quick Start Commands

```bash
# Development
docker-compose up --build

# Production
docker-compose -f docker-compose.prod.yml up -d

# Build only frontend
docker-compose build frontend

# View logs
docker-compose logs frontend

# Scale frontend
docker-compose up --scale frontend=3
```

## 🔍 Health Checks

The frontend includes a health check endpoint:

```bash
# Check if container is healthy
curl http://localhost:8080/health

# Docker health check
docker ps  # Shows health status
```

## 📊 Performance Optimizations

- **Gzip compression** for faster loading
- **Static asset caching** (1 year cache)
- **Multi-stage build** for smaller images
- **Alpine Linux** base image
- **Nginx optimizations** for SPA routing

## 🔒 Security Features

- X-Frame-Options header
- X-Content-Type-Options header
- X-XSS-Protection header
- Referrer-Policy header
- Content Security Policy ready

## 🐛 Troubleshooting

### Common Issues:

1. **Build fails**: Check Node.js version compatibility
2. **Routing issues**: Ensure nginx.conf handles SPA routing
3. **API connection**: Verify VITE_API_BASE_URL environment variable
4. **Port conflicts**: Change port mapping in docker-compose.yml

### Debug Commands:

```bash
# Check container logs
docker logs <container_id>

# Access container shell
docker exec -it <container_id> sh

# Test nginx config
docker exec <container_id> nginx -t
```

---

# 🚀 Full Stack Deployment Guide

## 🐳 Complete Docker Compose Deployment

### Development Environment

```bash
# Start all services (frontend, backend, mongodb)
docker-compose up --build

# Start in detached mode
docker-compose up -d --build

# View logs for all services
docker-compose logs -f

# Stop all services
docker-compose down
```

### Production Environment

```bash
# Deploy production stack
docker-compose -f docker-compose.prod.yml up -d --build

# Scale services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3 --scale frontend=2

# Update services
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d --build
```

## 🌐 Cloud Platform Deployments

### 1. AWS ECS Full Stack

```bash
# Create ECS cluster
aws ecs create-cluster --cluster-name book-shop-cluster

# Create task definitions for backend and frontend
aws ecs register-task-definition --cli-input-json file://backend-task-def.json
aws ecs register-task-definition --cli-input-json file://frontend-task-def.json

# Create services
aws ecs create-service --cluster book-shop-cluster --service-name backend --task-definition backend:1
aws ecs create-service --cluster book-shop-cluster --service-name frontend --task-definition frontend:1
```

### 2. Google Cloud Platform

```bash
# Deploy backend to Cloud Run
gcloud run deploy book-shop-backend \
  --image gcr.io/your-project-id/book-shop-backend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Deploy frontend to Cloud Run
gcloud run deploy book-shop-frontend \
  --image gcr.io/your-project-id/book-shop-frontend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### 3. Azure Container Instances

```bash
# Create resource group
az group create --name book-shop-rg --location eastus

# Deploy backend
az container create \
  --resource-group book-shop-rg \
  --name book-shop-backend \
  --image mparmilan/book-shop-backend:latest \
  --ports 5000

# Deploy frontend
az container create \
  --resource-group book-shop-rg \
  --name book-shop-frontend \
  --image mparmilan/book-shop-frontend:latest \
  --ports 80
```

## 🔄 CI/CD Pipeline Setup

### GitHub Actions Secrets Required

```bash
# Docker Hub credentials
DOCKER_USERNAME=mparmilan
DOCKER_PASSWORD=your_docker_password

# AWS credentials (if using AWS)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key

# GCP credentials (if using GCP)
GCP_SA_KEY=your_service_account_key
```

### Automated Deployment Workflow

1. **Push to main branch** triggers CI/CD
2. **Build and test** both frontend and backend
3. **Security scan** with Trivy
4. **Push images** to Docker Hub
5. **Deploy to staging** environment
6. **Run integration tests**
7. **Deploy to production** (manual approval)

## 📊 Monitoring and Logging

### Docker Compose Monitoring

```bash
# View resource usage
docker stats

# Monitor logs in real-time
docker-compose logs -f backend
docker-compose logs -f frontend

# Health checks
curl http://localhost:5000/  # Backend health
curl http://localhost:8080/health  # Frontend health
```

## 🚀 Quick Deployment Commands Summary

```bash
# Full stack development
docker-compose up --build

# Full stack production
docker-compose -f docker-compose.prod.yml up -d --build

# Build and push all images
./scripts/build-backend.sh v1.0.0 mparmilan
./scripts/build-frontend.sh v1.0.0 mparmilan

# Deploy to cloud (example)
docker-compose -f docker-compose.cloud.yml up -d

# Monitor deployment
docker-compose ps
docker-compose logs -f
```

## 🔍 Troubleshooting Full Stack

### Common Issues:

1. **Database connection**: Check MongoDB container status
2. **API not accessible**: Verify backend container and port mapping
3. **Frontend can't reach API**: Check VITE_API_BASE_URL environment variable
4. **CORS errors**: Verify backend CORS configuration

### Debug Commands:

```bash
# Check all container status
docker-compose ps

# View all logs
docker-compose logs

# Restart specific service
docker-compose restart backend

# Rebuild and restart
docker-compose up --build --force-recreate backend

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh
```

## 📈 Performance Optimization

- **Use multi-stage builds** for smaller images
- **Implement health checks** for better orchestration
- **Use Alpine Linux** for reduced image size
- **Enable gzip compression** in Nginx
- **Implement caching strategies** for static assets
- **Use connection pooling** for database connections

This comprehensive guide covers all aspects of building and deploying your full-stack Book Shop application using Docker! 🚀
