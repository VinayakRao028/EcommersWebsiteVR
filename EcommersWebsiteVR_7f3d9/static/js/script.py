from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/toggle_navbar', methods=['POST'])
def toggle_navbar():
    # This function will be called via AJAX to toggle the navbar
    # The actual toggling will be done client-side with JavaScript
    return '', 204  # Return empty response with "No Content" status

if __name__ == '__main__':
    app.run(debug=True)