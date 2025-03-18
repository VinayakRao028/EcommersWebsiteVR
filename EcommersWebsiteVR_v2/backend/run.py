import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import create_app, db
import logging
import click

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load configuration
config_name = os.getenv('FLASK_CONFIG', 'default')
app = create_app(config_name)

# Swagger configuration
if app.config.get('SWAGGER', False):
    from flasgger import Swagger
    swagger = Swagger(app)
    logger.info('Swagger UI enabled.')

@app.errorhandler(500)
def internal_server_error(error):
    logger.error(f'Server Error: {error}')
    return 'Internal Server Error', 500

@app.errorhandler(404)
def not_found_error(error):
    logger.error(f'Not Found Error: {error}')
    return 'Not Found', 404

def verify_database_connection():
    try:
        with app.app_context():
            db.engine.connect()
        logger.info("Database connection successful.")
        return True
    except Exception as e:
        logger.error(f"Database connection failed: {e}")
        return False

@app.cli.command("reset-db")
def reset_db():
    """Reset the database."""
    if click.confirm('Are you sure you want to reset the database?'):
        with app.app_context():
            db.drop_all()
            db.create_all()
            logger.info('Database reset successful.')
    else:
        logger.info('Database reset cancelled.')

if __name__ == '__main__':
    logger.info('Starting the application...')
    if verify_database_connection():
        port = int(os.getenv('PORT', 5000))
        app.run(host='0.0.0.0', port=port, debug=app.config.get('DEBUG', False))
        logger.info('Application shutdown.')
    else:
        logger.error('Application startup failed due to database connection issue.')