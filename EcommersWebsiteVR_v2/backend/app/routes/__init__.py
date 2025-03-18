from flask import Blueprint
from flasgger import Swagger
from EcommersWebsiteVR_v2.backend.app.routes.product_routes import product_routes

def register_routes(app):
    """
    Register all blueprint routes with the Flask app.
    """
    app.register_blueprint(product_routes, url_prefix='/api/products')

    # Initialize Swagger
    Swagger(app)

    # TODO: Register additional blueprints here as the application grows
    # Example:
    # from .user_routes import user_routes
    # app.register_blueprint(user_routes, url_prefix='/api/users')

# Export the register_routes function
__all__ = ['register_routes']