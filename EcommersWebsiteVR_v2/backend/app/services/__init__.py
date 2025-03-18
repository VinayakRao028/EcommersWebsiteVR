# Import services
from .product_service import ProductService

# Dictionary of all services
services = {
    'product': ProductService
}

def get_service(name):
    """
    Retrieve a service by name.

    Args:
        name (str): The name of the service to retrieve.

    Returns:
        The service class if found, None otherwise.

    Raises:
        ValueError: If the provided name is not a string.
    """
    if not isinstance(name, str):
        raise ValueError("Service name must be a string")
    return services.get(name)

def init_services():
    """
    Initialize all services.
    This function should be called once at application startup.
    """
    # For now, we don't have any initialization to do
    # But if we need it in the future, we can add it here
    pass

# Expose these functions and classes
__all__ = ['get_service', 'ProductService', 'init_services']