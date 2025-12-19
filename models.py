"""
Database models for the Expense Tracker application.
"""

from flask_sqlalchemy import SQLAlchemy
from datetime import date, datetime
from typing import Optional

# Initialize SQLAlchemy
db = SQLAlchemy()


class Expense(db.Model):
    """
    Expense model for storing expense data.
    """
    __tablename__ = 'expenses'
    
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today)
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def __init__(self, amount: float, category: str, date: date, description: Optional[str] = None):
        """
        Initialize an expense.
        
        Args:
            amount: The expense amount
            category: The expense category
            date: The expense date
            description: Optional description
        """
        self.amount = amount
        self.category = category
        self.date = date
        self.description = description
    
    def to_dict(self) -> dict:
        """
        Convert expense to dictionary.
        
        Returns:
            Dictionary representation of the expense
        """
        return {
            'id': self.id,
            'amount': self.amount,
            'category': self.category,
            'date': self.date.isoformat(),
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self) -> str:
        """String representation of the expense."""
        return f'<Expense {self.id}: {self.amount}€ - {self.category}>'