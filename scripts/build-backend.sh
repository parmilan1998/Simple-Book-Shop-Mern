#!/bin/bash

# Build and Deploy Backend Docker Image Script
set -e

# Configuration
IMAGE_NAME="book-shop-backend"
VERSION=${1:-"latest"}
REGISTRY=${2:-""}

echo "🚀 Building Backend Docker Image..."

# Navigate to backend directory
cd backend

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
echo "docker run -p 5000:5000 --env-file .env ${IMAGE_NAME}:${VERSION}"
echo ""
echo "🐳 To run with docker-compose:"
echo "docker-compose up --build"
