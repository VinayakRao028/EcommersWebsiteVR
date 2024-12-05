from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/toggle_navbar', methods=['POST'])
def toggle_navbar():
    # This function would be called via AJAX to toggle the navbar
    # In a real application, you'd update some server-side state here
    return '', 204  # Return a "No Content" response

if __name__ == '__main__':
    app.run(debug=True)