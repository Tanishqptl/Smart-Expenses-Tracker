# 🚀 Smart Expenses Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18+-61dafb.svg)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3+-000000.svg)](https://flask.palletsprojects.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ed.svg)](https://www.docker.com/)

> 💰 A full-stack web application for tracking personal expenses with a modern React frontend and Flask backend API. This application allows users to manage their expenses efficiently with features like expense categorization, analytics, budgeting, and responsive design.

## 👥 Authors

- **Kusuma** - Project Contributor 👨‍💻
- **Praveen** - Project Contributor 👨‍💻

## ✨ Features

- **💳 Expense Management**: Add, view, edit, and delete expenses with categorization
- **📊 Dashboard**: Interactive overview with financial metrics, recent transactions, and budget tracking
- **📈 Analytics**: Comprehensive expense analysis with category-wise breakdowns and monthly trends
- **🎯 Budgeting**: Set monthly budgets with alerts for overspending
- **📱 Responsive Design**: Modern UI built with Tailwind CSS and smooth animations
- **🔄 Dual Frontend Support**: Both React SPA and traditional Jinja2 templates
- **🔗 RESTful API**: Well-documented API for all expense operations
- **🗄️ SQLite Database**: Lightweight, file-based database with SQLAlchemy ORM

## 🏗️ Project Architecture

The Smart Expenses Tracker follows a **full-stack architecture** with clear separation of concerns:

### Backend Architecture 🖥️
- **Flask Framework**: Lightweight Python web framework handling HTTP requests
- **SQLAlchemy ORM**: Database abstraction layer for SQLite operations
- **Blueprint Pattern**: Modular API routing with separate blueprints for expenses and analytics
- **CORS Support**: Cross-origin resource sharing for frontend-backend communication

### Frontend Architecture 🎨
- **React SPA**: Component-based architecture with TypeScript for type safety
- **Vite Build Tool**: Fast development server and optimized production builds
- **State Management**: Custom hooks for expense data management
- **UI Components**: Reusable components built with Radix UI primitives

### Data Flow 🔄
```
User Interface (React/Jinja) → API Layer (Flask Blueprints) → Business Logic (Models) → Database (SQLite)
```

### Deployment Architecture 🚀
- **Docker Containerization**: Multi-stage Dockerfile for efficient production builds
- **Static Asset Serving**: Flask serves built React assets in production
- **Database Persistence**: SQLite files stored in container volumes

## 📁 Project Structure

```
smart-expenses-tracker/
├── backend/                          # Flask Backend Application 🖥️
│   ├── app.py                       # **Main executable file** - Flask application entry point
│   ├── config.py                    # Database and app configuration
│   ├── models.py                    # SQLAlchemy database models
│   ├── requirements.txt             # Python dependencies
│   └── routes/                      # API route blueprints
│       ├── __init__.py
│       ├── analytics.py             # Analytics API endpoints
│       └── expenses.py              # Expense CRUD operations
├── frontend/                        # Traditional HTML Frontend 🎨
│   ├── static/                      # Static assets (CSS, JS, images)
│   │   ├── css/
│   │   ├── images/
│   │   └── js/
│   └── templates/                   # Jinja2 HTML templates
│       ├── base.html
│       ├── index.html
│       ├── add_expense.html
│       ├── summary.html
│       ├── 404.html
│       └── 500.html
├── src/                             # React TypeScript Frontend ⚛️
│   ├── App.tsx                      # Main React application
│   ├── index.css                    # Global styles
│   ├── components/                  # Reusable React components
│   │   ├── ui/                      # UI primitive components
│   │   ├── AddExpenseForm.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ExpenseSummary.tsx
│   │   └── Navbar.tsx
│   ├── hooks/                       # Custom React hooks
│   │   └── useExpenses.ts
│   ├── lib/                         # Utility libraries
│   │   ├── api.ts                   # API client functions
│   │   └── utils.ts
│   └── utils/                       # Helper functions
│       └── format.ts
├── instance/                        # SQLite database files (auto-generated) 🗄️
├── screenshots/                     # Application screenshots 📸
├── .dockerignore                    # Docker ignore patterns 🐳
├── .gitignore                       # Git ignore patterns 🚫
├── Dockerfile                       # Docker container configuration 🐳
├── LICENSE                          # MIT License 📄
├── package.json                     # Node.js dependencies and scripts 📦
├── README.md                        # This file 📖
├── requirements.txt                 # Root-level Python dependencies 🐍
├── tailwind.config.js               # Tailwind CSS configuration 🎨
├── tsconfig.json                    # TypeScript configuration 📝
└── vite.config.ts                   # Vite build configuration ⚡
```

## 📋 File Structure Details

### Backend Files 🖥️
- **`app.py`**: **Main executable file** - Core application logic, routing, and Flask app initialization. Execution starts here when running `python backend/app.py`
- **`config.py`**: Configuration management for database URI and app settings
- **`models.py`**: Database models defining Expense entity with SQLAlchemy
- **`routes/`**: Modular API endpoints separated by functionality

### Frontend Files 🎨
- **`src/App.tsx`**: Root React component with routing
- **`src/components/`**: Modular UI components for different features
- **`src/hooks/`**: Custom hooks for data fetching and state management
- **`src/lib/`**: API utilities and helper functions

### Configuration Files ⚙️
- **`package.json`**: Node.js project metadata and build scripts
- **`requirements.txt`**: Python package dependencies
- **`tailwind.config.js`**: Tailwind CSS customization
- **`tsconfig.json`**: TypeScript compiler options
- **`vite.config.ts`**: Vite bundler configuration

## 🛠️ Tech Stack

### Backend Technologies 🐍
- **Flask**: Lightweight Python web framework
- **SQLAlchemy**: Python SQL toolkit and ORM
- **Flask-CORS**: Cross-origin resource sharing extension
- **SQLite**: Embedded relational database

### Frontend Technologies ⚛️
- **React 18**: Component-based UI library
- **TypeScript**: Typed JavaScript for better development experience
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Radix UI**: Accessible UI components

### Development Tools 🛠️
- **Docker**: Containerization platform
- **Git**: Version control system
- **npm**: Package manager for Node.js
- **pip**: Package installer for Python

## 🚀 Installation

### Prerequisites ✅
- **Python 3.8** or higher 🐍
- **Node.js 16** or higher 📦
- **npm** or **yarn** package manager
- **Docker** (optional, for containerized deployment) 🐳

### Backend Setup 🖥️

1. **📂 Navigate to project directory**:
   ```bash
   cd smart-expenses-tracker
   ```

2. **🐍 Create Python virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **📦 Install Python dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **▶️ Run Flask application**:
   ```bash
   python backend/app.py
   ```

The backend will start on `http://localhost:5000` ✨

### Frontend Setup (React Development) ⚛️

1. **📦 Install Node.js dependencies**:
   ```bash
   npm install
   ```

2. **🚀 Start development server**:
   ```bash
   npm run dev
   ```

The React app will start on `http://localhost:5173` ✨

### Frontend Setup (Flask Templates) 🎨

The Flask backend also serves traditional HTML templates for development:

1. Ensure the backend is running
2. Open `http://localhost:5000` in your browser

### Docker Setup (Production) 🐳

1. **🏗️ Build Docker image**:
   ```bash
   docker build -t smart-expenses-tracker .
   ```

2. **🚀 Run container**:
   ```bash
   docker run -p 5000:5000 smart-expenses-tracker
   ```

## 📖 Usage

### Adding Expenses 💳
1. Navigate to the "Add Expense" page ➕
2. Fill in amount, category, date, and description ✏️
3. Click "Add Expense" to save 💾

### Viewing Dashboard 📊
- Access the main dashboard for financial overview 👀
- View total expenses, transaction count, and budget status 📈
- Monitor spending trends and recent transactions 📋

### Analytics and Reports 📈
- Navigate to the summary page for detailed analytics 📊
- View category-wise expense breakdowns 📊
- Analyze monthly spending trends 📅
- Track budget compliance 🎯

## 🔗 API Endpoints

### Expense Management 💳
- `GET /api/expenses` - 📥 Retrieve all expenses
- `POST /api/expenses` - ➕ Create new expense
- `GET /api/expenses/<id>` - 🔍 Get specific expense
- `PUT /api/expenses/<id>` - ✏️ Update existing expense
- `DELETE /api/expenses/<id>` - 🗑️ Delete expense

### Analytics 📊
- `GET /api/analytics/category-totals` - 📊 Category-wise expense totals
- `GET /api/analytics/monthly-totals` - 📅 Monthly expense trends
- `GET /api/analytics/summary` - 📋 General expense summary

## 🗄️ Database

The application uses **SQLite** for data persistence with the following schema:

### Expense Table 📋
- `id`: Primary key (Integer) 🔑
- `amount`: Expense amount (Float) 💰
- `category`: Expense category (String) 🏷️
- `date`: Expense date (Date) 📅
- `description`: Optional description (String) 📝

Database files are automatically created in the `instance/` directory 📁

## 🔄 Development Workflow

### Local Development 🏠
1. **⚙️ Setup Environment**: Install dependencies and setup virtual environments
2. **▶️ Run Backend**: Start Flask development server
3. **🎨 Run Frontend**: Start Vite development server for React
4. **🗄️ Database**: SQLite database auto-creates on first run
5. **🧪 Testing**: Run backend tests with pytest, frontend tests with npm

### Production Deployment 🚀
1. **🏗️ Build Frontend**: Run `npm run build` to create production assets
2. **🐳 Build Docker Image**: Use provided Dockerfile for containerization
3. **🚀 Deploy Container**: Run container with proper port mapping
4. **💾 Database Backup**: Backup SQLite files for data persistence

### Code Quality ✨
- **🔍 Linting**: Use ESLint for JavaScript/TypeScript
- **🔒 Type Checking**: TypeScript for static type analysis
- **🧪 Testing**: Unit tests for both frontend and backend
- **🎨 Code Formatting**: Consistent formatting with Prettier

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **🍴 Fork the repository**
2. **🌿 Create feature branch**: `git checkout -b feature/amazing-feature`
3. **💻 Commit changes**: `git commit -m 'Add amazing feature'`
4. **📤 Push to branch**: `git push origin feature/amazing-feature`
5. **🔄 Open Pull Request**

### Development Guidelines 📋
- Follow existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

The MIT License allows for free use, modification, and distribution of the software, provided that the original copyright notice and disclaimer are included.

## 🙏 Acknowledgments

- **Flask**: For providing a simple yet powerful web framework
- **React**: For the component-based frontend architecture
- **SQLAlchemy**: For robust database operations
- **Tailwind CSS**: For utility-first styling approach
- **Radix UI**: For accessible and customizable UI components
- **Framer Motion**: For smooth animations and transitions
- **Vite**: For fast development and build tooling
- **Lucide React**: For beautiful and consistent icons
- **Open Source Community**: For the amazing tools and libraries that made this project possible

---

**Built with ❤️ for students and developers learning full-stack development**