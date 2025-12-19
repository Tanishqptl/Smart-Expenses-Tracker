# Smart Expenses Tracker

A full-stack web application for tracking personal expenses with a modern React frontend and Flask backend API.

## Features

- **Expense Management**: Add, view, and categorize expenses
- **Dashboard**: Overview of recent expenses and totals
- **Analytics**: Category-wise and monthly expense summaries
- **Responsive Design**: Modern UI with Tailwind CSS and animations
- **SQLite Database**: Lightweight, file-based database for data persistence
- **RESTful API**: Backend API for expense operations

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)
*Main dashboard showing recent expenses and summary statistics.*

### Add Expense
![Add Expense](screenshots/add-expense.png)
*Form to add new expenses with category selection.*

### Expense Summary
![Expense Summary](screenshots/expense-summary.png)
*Analytics view with category-wise and monthly breakdowns.*

## Tech Stack

### Backend
- **Flask**: Python web framework
- **SQLAlchemy**: ORM for database operations
- **Flask-CORS**: Cross-origin resource sharing
- **SQLite**: Database engine

### Frontend
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed JavaScript for better development experience
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Radix UI**: Accessible UI components

## Project Structure

```
smart-expenses-tracker/
├── backend/                 # Flask backend application
│   ├── app.py              # Main Flask application
│   ├── config.py           # Database configuration
│   ├── models.py           # SQLAlchemy models
│   ├── requirements.txt    # Python dependencies
│   └── routes/             # API route blueprints
│       ├── analytics.py    # Analytics endpoints
│       └── expenses.py     # Expense CRUD operations
├── frontend/               # Traditional HTML templates and static files
│   ├── static/             # CSS, JS, images
│   └── templates/          # Jinja2 HTML templates
├── src/                    # React TypeScript frontend
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries
│   └── utils/              # Helper functions
├── instance/               # SQLite database files
├── package.json            # Node.js dependencies and scripts
├── requirements.txt        # Python dependencies (root level)
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

The backend will start on `http://localhost:5000`

### Frontend Setup (React)

1. Install Node.js dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

The React app will start on `http://localhost:5173`

### Frontend Setup (Flask Templates)

The Flask backend also serves traditional HTML templates. To use this:

1. Ensure the backend is running
2. Open `http://localhost:5000` in your browser

## Usage

### Adding Expenses
- Navigate to the "Add Expense" page
- Enter amount, category, date, and description
- Click "Add Expense"

### Viewing Dashboard
- The dashboard shows recent expenses and total amounts
- Displays transaction count

### Analytics
- View expense summaries by category
- Monthly expense trends
- Category-wise breakdowns

## API Endpoints

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create new expense
- `GET /api/expenses/<id>` - Get specific expense
- `PUT /api/expenses/<id>` - Update expense
- `DELETE /api/expenses/<id>` - Delete expense

### Analytics
- `GET /api/analytics/category-totals` - Category-wise totals
- `GET /api/analytics/monthly-totals` - Monthly totals
- `GET /api/analytics/summary` - General summary

## Database

The application uses SQLite for data persistence. The database file is created automatically in the `instance/` directory.

## Development

### Running Tests
```bash
# Backend tests
cd backend
python -m pytest

# Frontend tests
npm test
```

### Building for Production
```bash
# Build React app
npm run build

# The built files will be in the `dist/` directory
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Flask and React
- UI components from Radix UI
- Icons from Lucide React
- Animations with Framer Motion