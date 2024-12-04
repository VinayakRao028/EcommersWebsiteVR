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

# Client-side JavaScript (to be included in the HTML template)
"""
document.addEventListener('DOMContentLoaded', function() {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
        bar.addEventListener('click', function() {
            nav.classList.add('active');
        });
    }

    if (close) {
        close.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    }
});
"""