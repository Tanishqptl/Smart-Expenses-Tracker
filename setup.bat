@echo off
REM Smart Expenses Tracker Setup Script for Windows
REM This script sets up the development environment for the Smart Expenses Tracker

echo Setting up Smart Expenses Tracker...

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Please install Python 3 first.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install Python dependencies
echo Installing Python dependencies...
pip install -r backend\requirements.txt

REM Install Node.js dependencies
echo Installing Node.js dependencies...
npm install

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    echo FLASK_APP=backend/app.py> .env
    echo FLASK_ENV=development>> .env
    echo SECRET_KEY=your-secret-key-change-this-in-production>> .env
    echo DATABASE_URL=sqlite:///instance/expenses.db>> .env
)

REM Create instance directory
if not exist instance mkdir instance

echo Setup complete!
echo.
echo To run the application:
echo 1. Activate the virtual environment: venv\Scripts\activate.bat
echo 2. Run the backend: python backend\app.py
echo 3. In another terminal, run the frontend: npm run dev
echo.
echo Or use Docker:
echo docker build -t smart-expenses-tracker .
echo docker run -p 5000:5000 smart-expenses-tracker
pause