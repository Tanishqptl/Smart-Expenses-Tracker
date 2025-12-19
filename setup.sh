#!/bin/bash

# Smart Expenses Tracker Setup Script
# This script sets up the development environment for the Smart Expenses Tracker

echo "Setting up Smart Expenses Tracker..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

# Check if Node.js is installed (for frontend)
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r backend/requirements.txt

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
FLASK_APP=backend/app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-change-this-in-production
DATABASE_URL=sqlite:///instance/expenses.db
EOF
fi

# Create instance directory
mkdir -p instance

echo "Setup complete!"
echo ""
echo "To run the application:"
echo "1. Activate the virtual environment: source venv/bin/activate"
echo "2. Run the backend: python backend/app.py"
echo "3. In another terminal, run the frontend: npm run dev"
echo ""
echo "Or use Docker:"
echo "docker build -t smart-expenses-tracker ."
echo "docker run -p 5000:5000 smart-expenses-tracker"