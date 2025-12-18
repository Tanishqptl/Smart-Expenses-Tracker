// Main JavaScript file for Smart Expense Tracker

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const flashMessages = document.querySelectorAll('.flash-message');

// Mobile Menu Toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close Flash Messages
flashMessages.forEach(message => {
    const closeBtn = message.querySelector('.flash-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            message.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                message.remove();
            }, 300);
        });
    }
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (message.parentNode) {
            message.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                message.remove();
            }, 300);
        }
    }, 5000);
    }
);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Validation
function validateExpenseForm(formData) {
    const errors = [];
    
    if (!formData.amount || formData.amount <= 0) {
        errors.push('Amount must be greater than 0');
    }
    
    if (!formData.category) {
        errors.push('Please select a category');
    }
    
    if (!formData.date) {
        errors.push('Date is required');
    }
    
    return errors;
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Format Date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// API Calls
async function fetchExpenses() {
    try {
        const response = await fetch('/api/expenses');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        return { success: false, error: error.message };
    }
}

async function addExpense(expenseData) {
    try {
        const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expenseData)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding expense:', error);
        return { success: false, error: error.message };
    }
}

async function getAnalytics() {
    try {
        const [monthlyResponse, categoryResponse] = await Promise.all([
            fetch('/api/analytics/monthly'),
            fetch('/api/analytics/categories')
        ]);
        
        const monthlyData = await monthlyResponse.json();
        const categoryData = await categoryResponse.json();
        
        return {
            monthly: monthlyData,
            categories: categoryData
        };
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return { success: false, error: error.message };
    }
}

async function loadSpendingAlert() {
    try {
        const response = await fetch('/api/analytics/spending-alert');
        const data = await response.json();
        
        if (data.success && data.data.alerts.length > 0) {
            const alertContainer = document.getElementById('spending-alert');
            if (alertContainer) {
                alertContainer.innerHTML = data.data.alerts.map(alert => `
                    <div class="alert alert-${alert.type} alert-dismissible fade show" role="alert">
                        <div class="alert-content">
                            <i class="fas fa-exclamation-triangle"></i>
                            <div>
                                <strong>${alert.type === 'danger' ? 'Budget Exceeded!' : 'Budget Warning'}</strong>
                                <p>${alert.message}</p>
                            </div>
                        </div>
                        <button type="button" class="alert-close">&times;</button>
                    </div>
                `).join('');
                
                // Add close functionality to new alerts
                alertContainer.querySelectorAll('.alert-close').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.target.closest('.alert').remove();
                    });
                });
            }
        }
    } catch (error) {
        console.error('Error loading spending alert:', error);
    }
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isInteracting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.stat-card, .expense-item, .summary-card, .chart-card, .breakdown-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Number Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = formatCurrency(current);
    }, 16);
}

// Initialize counters when visible
document.querySelectorAll('.stat-value, .summary-content h3').forEach(element => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const text = entry.target.textContent;
                const number = parseFloat(text.replace(/[^0-9.-]+/g, ''));
                if (!isNaN(number)) {
                    animateCounter(entry.target, number);
                    entry.target.classList.add('counted');
                }
            }
        });
    });
    observer.observe(element);
});

// Export functions for global use
window.ExpenseTracker = {
    formatCurrency,
    formatDate,
    fetchExpenses,
    addExpense,
    getAnalytics,
    loadSpendingAlert,
    validateExpenseForm
};

// Delete expense handler (called from templates)
window.deleteExpense = async function(id) {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    try {
        const res = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });
        const json = await res.json();
        if (!json.success) {
            alert(json.error || 'Failed to delete expense');
            return;
        }
        // Remove DOM node if present
        const el = document.querySelector(`.expense-item[data-id="${id}"]`);
        if (el) el.remove();
        // Optionally show a small flash
        const flashContainer = document.querySelector('.flash-container');
        if (flashContainer) {
            const msg = document.createElement('div');
            msg.className = 'flash-message flash-success';
            msg.innerHTML = `<i class="fas fa-check-circle"></i><span>Expense deleted</span><button class="flash-close">&times;</button>`;
            flashContainer.appendChild(msg);
            // attach close
            msg.querySelector('.flash-close').addEventListener('click', () => msg.remove());
            setTimeout(() => msg.remove(), 4000);
        }
    } catch (e) {
        console.error(e);
        alert('Failed to delete expense');
    }
};

// Edit expense handler: store expense in sessionStorage and navigate to add page
window.editExpense = async function(id) {
    try {
        const res = await fetch('/api/expenses');
        const json = await res.json();
        if (!json.success) { alert('Failed to load expense'); return; }
        const expense = json.data.find(e => e.id === id || e.id === Number(id));
        if (!expense) { alert('Expense not found'); return; }

        // Store for the add page to prefill
        sessionStorage.setItem('editingExpense', JSON.stringify({ originalId: id, expense }));
        window.location.href = '/add';
    } catch (e) {
        console.error(e);
        alert('Failed to prepare edit');
    }
};

// Prefill add-expense form when editing
document.addEventListener('DOMContentLoaded', () => {
    try {
        const editing = sessionStorage.getItem('editingExpense');
        if (!editing) return;
        const { originalId, expense } = JSON.parse(editing);
        // Only run on the add page
        if (!document.querySelector('.expense-form')) return;

        const amountInput = document.getElementById('amount');
        const dateInput = document.getElementById('date');
        const descInput = document.getElementById('description');
        if (amountInput) amountInput.value = expense.amount;
        if (dateInput) dateInput.value = (new Date(expense.date)).toISOString().split('T')[0];
        if (descInput) descInput.value = expense.description || '';

        // select category radio
        const catInput = document.querySelector(`.category-option input[value="${expense.category}"]`);
        if (catInput) {
            catInput.checked = true;
            const card = catInput.nextElementSibling;
            if (card) card.classList.add('selected');
        }

        // Change submit behavior to perform update (create new then delete original)
        const form = document.querySelector('.expense-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Expense';

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const fd = new FormData(form);
            const payload = {
                amount: fd.get('amount'),
                category: fd.get('category'),
                date: fd.get('date'),
                description: fd.get('description')
            };
            const errors = validateExpenseForm(payload);
            if (errors.length) { alert(errors.join('\n')); return; }

            // Create new expense via API
            const createRes = await addExpense(payload);
            if (!createRes.success) { alert(createRes.error || 'Failed to save'); return; }

            // Delete original expense
            await fetch(`/api/expenses/${originalId}`, { method: 'DELETE' });
            sessionStorage.removeItem('editingExpense');
            window.location.href = '/';
        });
    } catch (e) {
        console.error('Prefill/edit setup failed', e);
    }
});

// Add CSS animation for slide out
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .alert {
        background: white;
        border-radius: 12px;
        padding: 1rem 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 5px 20px rgba(0, 119, 182, 0.15);
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
    }
    
    .alert-warning {
        border-left: 4px solid var(--accent-yellow);
    }
    
    .alert-danger {
        border-left: 4px solid var(--accent-orange);
    }
    
    .alert-content {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
    }
    
    .alert-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--neutral-dark);
    }
`;
document.head.appendChild(style);