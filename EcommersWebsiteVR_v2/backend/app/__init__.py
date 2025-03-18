# app/__init__.py

import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flasgger import Swagger
from flask_migrate import Migrate

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

def create_app(config_name='default'):
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(f'app.config.{config_name.capitalize()}Config')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    Swagger(app)
    
    # Import and register blueprints
    from .routes.product_routes import product_routes
    app.register_blueprint(product_routes, url_prefix='/api/products')
    
    # Setup error handlers
    @app.errorhandler(404)
    def not_found(error):
        app.logger.error(f'Not found: {error}')
        return {"error": "Not found"}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        app.logger.error(f'Server error: {error}')
        return {"error": "Internal server error"}, 500
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app

# app/config.py

import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard-to-guess-string'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SWAGGER = {
        'title': 'E-commerce API',
        'uiversion': 3
    }

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'dev.sqlite')

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL') or \
        'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'test.sqlite')

class ProductionConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'prod.sqlite')

config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

# app/models/__init__.py

from .product_model import Product
# Import other models as they are created