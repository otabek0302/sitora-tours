#!/bin/sh

echo "🚀 Starting Sitora Tours Application..."

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 15

# Start the Next.js server
echo "🎯 Starting Next.js server..."
echo "📝 Note: Payload migrations will be handled automatically on first API call"

exec node server.js
