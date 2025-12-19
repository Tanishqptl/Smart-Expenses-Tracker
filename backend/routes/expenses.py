"""
Expense API routes.
"""

from flask import Blueprint, jsonify, request
from models import db, Expense
from typing import Dict, Any

expenses_bp = Blueprint('expenses', __name__)


@expenses_bp.route('/expenses', methods=['GET'])
def get_expenses() -> Dict[str, Any]:
    """
    Get all expenses.
    
    Returns:
        JSON response with all expenses
    """
    try:
        expenses = Expense.query.order_by(Expense.date.desc()).all()
        return jsonify({
            'success': True,
            'data': [expense.to_dict() for expense in expenses]
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@expenses_bp.route('/expenses', methods=['POST'])
def create_expense() -> Dict[str, Any]:
    """
    Create a new expense.
    
    Returns:
        JSON response with the created expense
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('amount') or not data.get('category'):
            return jsonify({
                'success': False,
                'error': 'Amount and category are required'
            }), 400
        
        # Create new expense
        expense = Expense(
            amount=float(data['amount']),
            category=data['category'],
            date=data.get('date'),
            description=data.get('description', '')
        )
        
        # Save to database
        db.session.add(expense)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'data': expense.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@expenses_bp.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id: int) -> Dict[str, Any]:
    """
    Delete an expense.
    
    Args:
        expense_id: ID of the expense to delete
        
    Returns:
        JSON response
    """
    try:
        expense = Expense.query.get_or_404(expense_id)
        db.session.delete(expense)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Expense deleted successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500