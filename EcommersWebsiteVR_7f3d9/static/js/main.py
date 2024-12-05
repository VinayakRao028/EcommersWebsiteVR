import torch
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/toggle_navbar', methods=['POST'])
def toggle_navbar():
    # This function would be called via AJAX to toggle the navbar
    # In a real application, you'd update the session or database here
    return '', 204  # Return empty response with "No Content" status

if __name__ == '__main__':
    app.run(debug=True)

# Client-side JavaScript to be included in the HTML template
"""
<script>
document.addEventListener('DOMContentLoaded', function() {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
        bar.addEventListener('click', function() {
            nav.classList.add('active');
            fetch('/toggle_navbar', {method: 'POST'});
        });
    }

    if (close) {
        close.addEventListener('click', function() {
            nav.classList.remove('active');
            fetch('/toggle_navbar', {method: 'POST'});
        });
    }
});
</script>
"""