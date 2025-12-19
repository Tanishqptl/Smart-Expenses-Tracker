"""
Analytics API routes.
"""

from flask import Blueprint, jsonify
from models import Expense, db
from datetime import datetime
from typing import Dict, Any, List
from collections import defaultdict

analytics_bp = Blueprint('analytics', __name__)


@analytics_bp.route('/analytics/monthly', methods=['GET'])
def monthly_summary() -> Dict[str, Any]:
    """
    Get monthly expense summary.
    
    Returns:
        JSON response with monthly totals by category
    """
    try:
        expenses = Expense.query.all()
        monthly_data = defaultdict(lambda: defaultdict(float))
        
        for expense in expenses:
            month_key = expense.date.strftime('%Y-%m')
            monthly_data[month_key][expense.category] += expense.amount
        
        # Format the response
        result = []
        for month, categories in monthly_data.items():
            month_data = {
                'month': month,
                'categories': [
                    {'category': cat, 'total': total}
                    for cat, total in categories.items()
                ],
                'total': sum(categories.values())
            }
            result.append(month_data)
        
        # Sort by month
        result.sort(key=lambda x: x['month'], reverse=True)
        
        return jsonify({
            'success': True,
            'data': result
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@analytics_bp.route('/analytics/categories', methods=['GET'])
def category_summary() -> Dict[str, Any]:
    """
    Get category-wise expense summary.
    
    Returns:
        JSON response with category totals
    """
    try:
        expenses = Expense.query.all()
        category_totals = defaultdict(float)
        
        for expense in expenses:
            category_totals[expense.category] += expense.amount
        
        # Sort by amount (descending)
        sorted_categories = sorted(
            category_totals.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        return jsonify({
            'success': True,
            'data': [
                {'category': cat, 'total': total}
                for cat, total in sorted_categories
            ]
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@analytics_bp.route('/analytics/spending-alert', methods=['GET'])
def spending_alert() -> Dict[str, Any]:
    """
    Check for spending alerts based on monthly limits.
    
    Returns:
        JSON response with alert information
    """
    try:
        # Get current month expenses
        current_month = datetime.now().strftime('%Y-%m')
        current_month_expenses = Expense.query.filter(
            Expense.date.like(f'{current_month}%')
        ).all()
        
        monthly_total = sum(exp.amount for exp in current_month_expenses)
        
        # Define monthly limits (can be made configurable)
        monthly_limit = 1000.0  # €1000 per month
        warning_threshold = 0.8  # 80% of limit
        
        alerts = []
        
        if monthly_total >= monthly_limit:
            alerts.append({
                'type': 'danger',
                'message': f'You have exceeded your monthly budget of €{monthly_limit:.2f}!',
                'current': monthly_total,
                'limit': monthly_limit
            })
        elif monthly_total >= monthly_limit * warning_threshold:
            alerts.append({
                'type': 'warning',
                'message': f'You have used {((monthly_total/monthly_limit)*100):.1f}% of your monthly budget',
                'current': monthly_total,
                'limit': monthly_limit
            })
        
        return jsonify({
            'success': True,
            'data': {
                'monthly_total': monthly_total,
                'monthly_limit': monthly_limit,
                'alerts': alerts
            }
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500