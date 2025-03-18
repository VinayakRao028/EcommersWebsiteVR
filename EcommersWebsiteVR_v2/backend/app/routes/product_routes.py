from flask import Blueprint, request, jsonify
from app.models.product_model import Product
from app.services.product_service import ProductService

product_routes = Blueprint('product_routes', __name__)
product_service = ProductService()

@product_routes.route('/', methods=['GET'])
def get_products():
    """
    Get all products
    ---
    responses:
      200:
        description: A list of all products
        schema:
          type: array
          items:
            $ref: '#/definitions/Product'
    """
    return jsonify(product_service.get_all_products()), 200

@product_routes.route('/<int:prod_id>', methods=['GET'])
def get_product(prod_id):
    """
    Get a specific product by ID
    ---
    parameters:
      - name: prod_id
        in: path
        type: integer
        required: true
        description: The ID of the product to retrieve
    responses:
      200:
        description: The requested product
        schema:
          $ref: '#/definitions/Product'
      404:
        description: Product not found
    """
    product = product_service.get_product(prod_id)
    if product:
        return jsonify(product), 200
    return jsonify({"error": "Product not found"}), 404

@product_routes.route('/<int:prod_id>', methods=['DELETE'])
def delete_product(prod_id):
    """
    Delete a specific product by ID
    ---
    parameters:
      - name: prod_id
        in: path
        type: integer
        required: true
        description: The ID of the product to delete
    responses:
      200:
        description: The deleted product
        schema:
          $ref: '#/definitions/Product'
      404:
        description: Product not found
    """
    deleted_product = product_service.delete_product(prod_id)
    if deleted_product:
        return jsonify(deleted_product), 200
    return jsonify({"error": "Product not found"}), 404

@product_routes.route('/', methods=['POST'])
def add_product():
    """
    Add a new product
    ---
    parameters:
      - name: product
        in: body
        required: true
        schema:
          $ref: '#/definitions/Product'
    responses:
      201:
        description: The newly created product
        schema:
          $ref: '#/definitions/Product'
      400:
        description: Invalid input
    """
    product_data = request.json
    new_product = product_service.add_product(product_data)
    return jsonify(new_product), 201

@product_routes.route('/<int:prod_id>', methods=['PUT'])
def update_product(prod_id):
    """
    Update an existing product
    ---
    parameters:
      - name: prod_id
        in: path
        type: integer
        required: true
        description: The ID of the product to update
      - name: product
        in: body
        required: true
        schema:
          $ref: '#/definitions/Product'
    responses:
      200:
        description: The updated product
        schema:
          $ref: '#/definitions/Product'
      404:
        description: Product not found
    """
    product_data = request.json
    updated_product = product_service.update_product(prod_id, product_data)
    if updated_product:
        return jsonify(updated_product), 200
    return jsonify({"error": "Product not found"}), 404