#!/bin/bash

# Minimal Build Script for Low-Memory VPS
# This script builds the app with absolute minimal memory usage

set -e

echo "🔧 Starting minimal memory build for VPS..."

# Clean everything first
echo "🧹 Cleaning build cache and node_modules..."
rm -rf .next
rm -rf node_modules/.cache

# Set minimal memory allocation
export NODE_OPTIONS="--max-old-space-size=768 --no-deprecation"

# Try building with minimal settings
echo "📦 Building with minimal memory (768MB)..."
SKIP_ENV_VALIDATION=true NODE_ENV=production npx next build --no-lint || {
    echo "⚠️  First attempt failed, trying even more minimal..."
    
    # Even more minimal - 512MB
    export NODE_OPTIONS="--max-old-space-size=512 --no-deprecation"
    SKIP_ENV_VALIDATION=true NODE_ENV=production npx next build --no-lint --experimental-build-mode=compile || {
        echo "❌ Minimal build failed!"
        echo "💡 Your VPS needs more memory or swap space"
        exit 1
    }
}

echo "✅ Minimal build completed successfully!"
