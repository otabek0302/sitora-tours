#!/bin/bash

# Add Swap Memory for VPS Build
# This helps with memory-intensive builds on low-RAM VPS

echo "🔄 Adding 2GB swap memory to help with build process..."

# Check if swap already exists
if [ -f /swapfile ]; then
    echo "⚠️  Swap file already exists. Removing old one..."
    sudo swapoff /swapfile 2>/dev/null || true
    sudo rm -f /swapfile
fi

# Create 2GB swap file
echo "📦 Creating 2GB swap file..."
sudo fallocate -l 2G /swapfile

# Set proper permissions
sudo chmod 600 /swapfile

# Create swap space
sudo mkswap /swapfile

# Enable swap
sudo swapon /swapfile

# Verify swap is active
echo "✅ Swap memory added successfully!"
echo "📊 Memory status:"
free -h

echo ""
echo "💡 Swap will persist until reboot."
echo "To make it permanent, add this line to /etc/fstab:"
echo "/swapfile none swap sw 0 0"
