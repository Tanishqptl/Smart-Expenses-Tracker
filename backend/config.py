import os

# Minimal config for local development. Adjust as needed.
BASE_DIR = os.path.dirname(__file__)
# SQLite database stored in instance/expenses.db
DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'instance', 'expenses.db')}"

# Other config values
SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'dev-secret-key')
"""
Configuration settings for the Expense Tracker application.
"""

import os

# Database configuration
DATABASE_URI = 'sqlite:///database.db'

# Application settings
SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')

# Flask settings
DEBUG = os.environ.get('FLASK_DEBUG', 'True').lower() == 'true'

# CORS settings
CORS_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000']