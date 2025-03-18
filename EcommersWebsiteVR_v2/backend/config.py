import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # Application settings
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    TESTING = os.getenv('TESTING', 'False').lower() == 'true'
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')

    # Database configurations
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///ecommerce.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # API configurations
    API_VERSION = 'v1'
    API_PREFIX = f'/api/{API_VERSION}'

    # Logging configurations
    LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')

    # Payment gateway configurations (example for Stripe)
    STRIPE_PUBLIC_KEY = os.getenv('STRIPE_PUBLIC_KEY')
    STRIPE_SECRET_KEY = os.getenv('STRIPE_SECRET_KEY')

    # Email service settings
    MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    MAIL_PORT = int(os.getenv('MAIL_PORT', 587))
    MAIL_USERNAME = os.getenv('MAIL_USERNAME')
    MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
    MAIL_USE_TLS = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'

    # File upload settings
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024))  # 16 MB by default

    # VR-specific configurations
    VR_ENABLED = os.getenv('VR_ENABLED', 'False').lower() == 'true'
    VR_FRAME_RATE = int(os.getenv('VR_FRAME_RATE', 90))
    VR_RESOLUTION = os.getenv('VR_RESOLUTION', '2160x1200')

    # Performance configurations
    CACHE_TYPE = os.getenv('CACHE_TYPE', 'simple')
    CACHE_REDIS_URL = os.getenv('CACHE_REDIS_URL', 'redis://localhost:6379/0')

    # Security configurations
    SESSION_COOKIE_SECURE = True
    REMEMBER_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    CSRF_ENABLED = True
    CSRF_SECRET_KEY = os.getenv('CSRF_SECRET_KEY', 'csrf_secret_key')

class DevelopmentConfig(Config):
    DEBUG = True
    SESSION_COOKIE_SECURE = False
    REMEMBER_COOKIE_SECURE = False

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    SESSION_COOKIE_SECURE = False
    REMEMBER_COOKIE_SECURE = False

class ProductionConfig(Config):
    DEBUG = False
    # Add any production-specific settings here

# Configuration dictionary
config = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

def get_config():
    return config[os.getenv('FLASK_ENV', 'default')]