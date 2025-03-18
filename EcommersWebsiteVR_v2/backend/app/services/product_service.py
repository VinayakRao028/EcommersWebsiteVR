from flask import Blueprint, request, jsonify
from app.models.product_model import Product
from app.services.product_service import ProductService
from flasgger import swag_from

product_routes = Blueprint('product_routes', __name__)
product_service = ProductService()

@product_routes.route('/', methods=['GET'])
@swag_from({
    'responses': {
        200: {
            'description': 'List of all products',
            'schema': Product.schema(many=True)
        }
    }
})
def get_products():
    """
    Get all products
    This endpoint returns a list of all products.
    """
    return jsonify(product_service.get_all_products()), 200

@product_routes.route('/<int:prod_id>', methods=['GET'])
@swag_from({
    'parameters': [
        {
            'name': 'prod_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the product to retrieve'
        }
    ],
    'responses': {
        200: {
            'description': 'Product details',
            'schema': Product.schema()
        },
        404: {
            'description': 'Product not found'
        }
    }
})
def get_product(prod_id):
    """
    Get a specific product
    This endpoint returns the details of a specific product.
    """
    product = product_service.get_product(prod_id)
    if product:
        return jsonify(product), 200
    return jsonify({'message': 'Product not found'}), 404

@product_routes.route('/<int:prod_id>', methods=['DELETE'])
@swag_from({
    'parameters': [
        {
            'name': 'prod_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the product to delete'
        }
    ],
    'responses': {
        200: {
            'description': 'Product deleted successfully',
            'schema': Product.schema()
        },
        404: {
            'description': 'Product not found'
        }
    }
})
def delete_product(prod_id):
    """
    Delete a product
    This endpoint deletes a specific product.
    """
    deleted_product = product_service.delete_product(prod_id)
    if deleted_product:
        return jsonify(deleted_product), 200
    return jsonify({'message': 'Product not found'}), 404

@product_routes.route('/', methods=['POST'])
@swag_from({
    'parameters': [
        {
            'name': 'product',
            'in': 'body',
            'schema': Product.schema()
        }
    ],
    'responses': {
        201: {
            'description': 'Product created successfully',
            'schema': Product.schema()
        }
    }
})
def add_product():
    """
    Add a new product
    This endpoint creates a new product.
    """
    product_data = request.json
    new_product = product_service.add_product(product_data)
    return jsonify(new_product), 201

@product_routes.route('/<int:prod_id>', methods=['PUT'])
@swag_from({
    'parameters': [
        {
            'name': 'prod_id',
            'in': 'path',
            'type': 'integer',
            'required': True,
            'description': 'ID of the product to update'
        },
        {
            'name': 'product',
            'in': 'body',
            'schema': Product.schema()
        }
    ],
    'responses': {
        200: {
            'description': 'Product updated successfully',
            'schema': Product.schema()
        },
        404: {
            'description': 'Product not found'
        }
    }
})
def update_product(prod_id):
    """
    Update a product
    This endpoint updates an existing product.
    """
    product_data = request.json
    updated_product = product_service.update_product(prod_id, product_data)
    if updated_product:
        return jsonify(updated_product), 200
    return jsonify({'message': 'Product not found'}), 404