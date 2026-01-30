#!/bin/bash

echo "Starting Next.js Documentation Portal..."
echo "Environment: ${NODE_ENV:-development}"
echo "Port: ${PORT:-3000}"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Run development or production server
if [ "$NODE_ENV" = "production" ]; then
  echo "Building for production..."
  npm run build
  echo "Starting production server..."
  npm start
else
  echo "Starting development server..."
  npm run dev
fi
