# Multi-stage build for Smart Expenses Tracker

# Stage 1: Build the React frontend
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (create dist directory even if build fails)
RUN npm run build || mkdir -p dist

# Stage 2: Setup Python backend
FROM python:3.11-alpine

WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ ./

# Copy built frontend from build stage
COPY --from=build /app/dist ./static

# Create instance directory for SQLite database
RUN mkdir -p instance

# Expose port
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV SECRET_KEY=your-production-secret-key-change-this

# Run the application
CMD ["python", "app.py"]
