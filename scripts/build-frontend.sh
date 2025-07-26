#!/bin/bash

# Build and Deploy Frontend Docker Image Script
set -e

# Configuration
IMAGE_NAME="book-shop-frontend"
VERSION=${1:-"latest"}
REGISTRY=${2:-""}

echo "🚀 Building Frontend Docker Image..."

# Navigate to frontend directory
cd frontend

# Build the Docker image
echo "📦 Building Docker image: ${IMAGE_NAME}:${VERSION}"
docker build -t ${IMAGE_NAME}:${VERSION} .

# Tag for registry if provided
if [ ! -z "$REGISTRY" ]; then
    echo "🏷️  Tagging for registry: ${REGISTRY}/${IMAGE_NAME}:${VERSION}"
    docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:${VERSION}
    
    echo "📤 Pushing to registry..."
    docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}
fi

echo "✅ Build completed successfully!"
echo "📋 Image: ${IMAGE_NAME}:${VERSION}"

# Show image info
docker images | grep ${IMAGE_NAME}

echo ""
echo "🚀 To run locally:"
echo "docker run -p 8080:80 ${IMAGE_NAME}:${VERSION}"
echo ""
echo "🐳 To run with docker-compose:"
echo "docker-compose up --build frontend"
echo ""
echo "🌐 Access the app at: http://localhost:8080"
