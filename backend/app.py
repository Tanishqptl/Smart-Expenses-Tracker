"""
Expense Tracker Flask Application
A simple expense tracking application with SQLite database.
"""

import sys
import subprocess
import os
from importlib.metadata import PackageNotFoundError, distribution


def ensure_dependencies(auto_install=True):
    """
    Ensure required packages from backend/requirements.txt are installed.
    If missing packages are found and automatic install is enabled (default),
    attempt to install them using the current Python executable.

    Set environment variable DISABLE_AUTO_INSTALL=1 to skip automatic install.
    """
    req_file = os.path.join(os.path.dirname(__file__), 'requirements.txt')
    if not os.path.exists(req_file):
        return

    required = []
    with open(req_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#') or line.startswith('-e'):
                continue
            # Handle environment markers and version pins
            pkg = line.split(';')[0].strip()
            pkg = pkg.split('==')[0].strip()
            required.append(pkg)

    missing = []
    for pkg in required:
        try:
            distribution(pkg)
        except PackageNotFoundError:
            missing.append(pkg)

    if not missing:
        return

    if os.environ.get('DISABLE_AUTO_INSTALL') == '1' or not auto_install:
        print(f"Missing packages: {missing}. Install them with: {sys.executable} -m pip install -r {req_file}")
        sys.exit(1)

    print(f"Missing packages detected: {missing}. Attempting to install from {req_file} using {sys.executable}...")
    try:
        subprocess.check_call([sys.executable, '-m', 'pip', 'install', '-r', req_file])
    except subprocess.CalledProcessError as e:
        print('Automatic installation failed:', e)
        sys.exit(1)

    # Verify install
    still_missing = []
    for pkg in missing:
        try:
            distribution(pkg)
        except PackageNotFoundError:
            still_missing.append(pkg)
    if still_missing:
        print(f"Some packages failed to install: {still_missing}. Please install them manually.")
        sys.exit(1)


# Run dependency check at startup
ensure_dependencies()

from flask import Flask, send_from_directory
from flask_cors import CORS
from config import DATABASE_URI
from models import db, Expense
from routes.expenses import expenses_bp
from routes.analytics import analytics_bp

# Check if React app is built
react_built = os.path.exists('static/index.html')

if react_built:
    # Serve React SPA
    app = Flask(__name__, static_folder='static')
else:
    # Serve Jinja templates for development
    templates_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'templates'))
    static_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'static'))
    app = Flask(__name__, template_folder=templates_path, static_folder=static_path)

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

if react_built:
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
else:
    # Import render_template only when needed
    from flask import render_template, request, jsonify, redirect, url_for, flash
    from datetime import datetime, date

    @app.route('/')
    def home():
        """Home page - Dashboard with recent expenses"""
        try:
            # Get recent expenses (last 10)
            recent_expenses = Expense.query.order_by(Expense.date.desc()).limit(10).all()
            
            # Calculate totals
            total_expenses = db.session.query(db.func.sum(Expense.amount)).scalar() or 0
            total_transactions = Expense.query.count()
            
            return render_template(
                'index.html',
                expenses=recent_expenses,
                total=total_expenses,
                transactions=total_transactions
            )
        except Exception as e:
            flash(f'Error loading dashboard: {str(e)}', 'error')
            return render_template('index.html', expenses=[], total=0, transactions=0)

    @app.route('/add')
    def add_expense_page():
        """Add expense page"""
        # Pass today's date to template to avoid relying on client-side moment.js
        today = date.today().isoformat()
        return render_template('add_expense.html', today=today)

    @app.route('/summary')
    def summary_page():
        """Expense summary and analytics page"""
        try:
            # Get all expenses for analytics
            expenses = Expense.query.all()
            
            # Calculate category totals
            category_totals = {}
            for expense in expenses:
                if expense.category not in category_totals:
                    category_totals[expense.category] = 0
                category_totals[expense.category] += expense.amount
            
            # Calculate monthly totals
            monthly_totals = {}
            for expense in expenses:
                month_key = expense.date.strftime('%Y-%m')
                if month_key not in monthly_totals:
                    monthly_totals[month_key] = 0
                monthly_totals[month_key] += expense.amount
            
            return render_template(
                'summary.html',
                expenses=expenses,
                category_totals=category_totals,
                monthly_totals=monthly_totals
            )
        except Exception as e:
            flash(f'Error loading summary: {str(e)}', 'error')
            return render_template('summary.html', expenses=[], category_totals={}, monthly_totals={})

    @app.route('/add_expense', methods=['POST'])
    def add_expense():
        """Handle expense addition form submission"""
        try:
            # Get form data
            amount = float(request.form.get('amount'))
            category = request.form.get('category')
            expense_date = request.form.get('date')
            description = request.form.get('description', '')
            
            # Validate data
            if not amount or amount <= 0:
                flash('Amount must be greater than 0', 'error')
                return redirect(url_for('add_expense_page'))
            
            if not category:
                flash('Category is required', 'error')
                return redirect(url_for('add_expense_page'))
            
            # Parse date
            if expense_date:
                expense_date = datetime.strptime(expense_date, '%Y-%m-%d').date()
            else:
                expense_date = date.today()
            
            # Create new expense
            new_expense = Expense(
                amount=amount,
                category=category,
                date=expense_date,
                description=description
            )
            
            # Save to database
            db.session.add(new_expense)
            db.session.commit()
            
            flash('Expense added successfully!', 'success')
            return redirect(url_for('home'))
            
        except ValueError:
            flash('Invalid amount format', 'error')
            return redirect(url_for('add_expense_page'))
        except Exception as e:
            flash(f'Error adding expense: {str(e)}', 'error')
            return redirect(url_for('add_expense_page'))


@app.errorhandler(404)
def not_found_error(error):
    if react_built:
        """Handle 404 errors by serving React app"""
        return send_from_directory(app.static_folder, 'index.html')
    else:
        """Handle 404 errors"""
        return render_template('404.html'), 404


@app.errorhandler(500)
def internal_error(error):
    if react_built:
        """Handle 500 errors"""
        db.session.rollback()
        return send_from_directory(app.static_folder, 'index.html'), 500
    else:
        """Handle 500 errors"""
        db.session.rollback()
        return render_template('500.html'), 500


if __name__ == '__main__':
    with app.app_context():
        # Create database tables
        db.create_all()
    
    # Run the application
    app.run(host='0.0.0.0', port=5000, debug=True)