# frontend/app.py
from flask import Flask, render_template

app = Flask(__name__)

# Serve the main page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # Typically run on port 5000 or 3000. 
    app.run(debug=True, port=5000)


