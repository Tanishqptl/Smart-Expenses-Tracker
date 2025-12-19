"""
Expense Tracker Flask Application
A simple expense tracking application with SQLite database.
"""

from flask import Flask, send_from_directory
from flask_cors import CORS
import os
from config import DATABASE_URI
from models import db, Expense
from routes.expenses import expenses_bp
from routes.analytics import analytics_bp

# Initialize Flask app
app = Flask(__name__, static_folder='static')
app.config['SECRET_KEY'] = 'your-secret-key-here'
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db.init_app(app)

# Enable CORS for API routes
CORS(app)

# Register blueprints
app.register_blueprint(expenses_bp, url_prefix='/api')
app.register_blueprint(analytics_bp, url_prefix='/api')

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    if path.startswith('api/'):
        # Let Flask handle API routes
        pass
    elif path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found_error(error):
    """Handle 404 errors by serving React app"""
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    db.session.rollback()
    return send_from_directory(app.static_folder, 'index.html'), 500


if __name__ == '__main__':
    with app.app_context():
        # Create database tables
        db.create_all()
    
    # Run the application
    app.run(host='0.0.0.0', port=5000, debug=True)