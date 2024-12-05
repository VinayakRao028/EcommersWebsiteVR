from flask import Flask, render_template, request, jsonify
from flask_swagger_ui import get_swaggerui_blueprint

app = Flask(__name__)

# Swagger configuration
SWAGGER_URL = '/api/docs'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "Ecommerce Website API"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

@app.route('/')
def index():
    """
    Render the main page of the ecommerce website.
    ---
    responses:
      200:
        description: Renders the index.html template
    """
    return render_template('index.html')

@app.route('/toggle_navbar', methods=['POST'])
def toggle_navbar():
    """
    Toggle the navbar (to be implemented client-side).
    ---
    responses:
      204:
        description: Navbar toggled successfully
    """
    # The actual toggling logic should be implemented client-side
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)