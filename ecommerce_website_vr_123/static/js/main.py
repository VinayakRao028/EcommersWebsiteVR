from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/toggle_navbar', methods=['POST'])
def toggle_navbar():
    action = request.form.get('action')
    if action == 'open':
        # Logic to add 'active' class to navbar
        return {'status': 'Navbar opened'}
    elif action == 'close':
        # Logic to remove 'active' class from navbar
        return {'status': 'Navbar closed'}
    else:
        return {'status': 'Invalid action'}, 400

if __name__ == '__main__':
    app.run(debug=True)

# Note: This Python code provides a backend structure for handling navbar toggling.
# The actual DOM manipulation would still need to be done client-side with JavaScript.
# You would need to create corresponding JavaScript to make AJAX calls to these endpoints.

# Example JavaScript for frontend (to be included in your HTML):
'''
document.getElementById('bar').addEventListener('click', function() {
    fetch('/toggle_navbar', {
        method: 'POST',
        body: new URLSearchParams('action=open'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(response => response.json())
      .then(data => console.log(data.status));
});

document.getElementById('close').addEventListener('click', function() {
    fetch('/toggle_navbar', {
        method: 'POST',
        body: new URLSearchParams('action=close'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(response => response.json())
      .then(data => console.log(data.status));
});
'''