#!/bin/bash

echo "🕷️ Installing ScrapeGraphAI Chrome Extension..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the extension
echo "🔨 Building extension..."
npm run build

echo "✅ Installation complete!"
echo "To load the extension in your browser:"
echo "1. Go to chrome://extensions/"
echo "2. Enable 'Developer mode' in the top right"
echo "3. Click 'Load unpacked' and select the 'dist' folder" 