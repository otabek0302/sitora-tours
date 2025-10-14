#!/bin/bash

# Sitora Tours - Nginx Setup Script
# Run this on your VPS to configure Nginx

echo "🔧 Setting up Nginx for Sitora Tours..."

# Copy nginx configuration
sudo cp /root/sitora-tours/nginx.conf /etc/nginx/sites-available/sitoratour.uz

# Create symbolic link
sudo ln -sf /etc/nginx/sites-available/sitoratour.uz /etc/nginx/sites-enabled/

# Remove default nginx site
sudo rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Nginx configuration is valid"
    
    # Reload nginx
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded successfully"
    
    echo ""
    echo "🎉 Nginx setup complete!"
    echo "Your app should now be accessible at:"
    echo "  • http://45.144.178.238"
    echo "  • http://sitoratour.uz (after DNS update)"
    echo ""
    echo "To test:"
    echo "  curl http://45.144.178.238"
else
    echo "❌ Nginx configuration error. Please check the config file."
    exit 1
fi
