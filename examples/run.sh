#!/bin/bash

# Check if we're in the right directory
if [ ! -d "examples" ]; then
  # If not, check if we're in the examples directory
  if [ -f "example.html" ]; then
    cd ..
  else
    echo "Error: Please run this script from the project root or the examples directory."
    exit 1
  fi
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build the project
echo "Building the project..."
npm run build

# Start the dev server
echo "Starting development server..."

http-server . -o examples/example.html

