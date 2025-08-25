#!/bin/bash
# Deploy to Vercel script

echo "🚀 Deploying HackHub to Vercel..."

# Check if vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Navigate to the web app directory
cd apps/web

# Deploy to Vercel
echo "Starting deployment..."
vercel --prod

echo "✅ Deployment complete!"
echo "Don't forget to set these environment variables in Vercel dashboard:"
echo "- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZnVuLWhvcnNlLTQyLmNsZXJrLmFjY291bnRzLmRldiQ"
echo "- CLERK_SECRET_KEY=sk_test_XBjkLYri4skFEgazPQeFCEAguRr35ot6OCS9brpiJe"
echo "- DATABASE_URL=your_sql_server_connection_string"
