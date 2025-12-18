   python -m venv venv
   ```

3. **Activate virtual environment:**
   - **Windows:** `venv\Scripts\activate`
   - **macOS/Linux:** `source venv/bin/activate`

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create environment file:**
   ```bash
   # Create .env file with:
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=sqlite:///db.sqlite
   ```

6. **Run the application:**
   ```bash
   flask run
   ```

### Running the Application

#### Method 1: Using Flask CLI