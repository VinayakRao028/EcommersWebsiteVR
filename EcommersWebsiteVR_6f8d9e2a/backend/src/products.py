from flask import Blueprint, jsonify, request
from .database import db
from .models import Product

products_bp = Blueprint('products', __name__)

class ProductService:
    @staticmethod
    def get_all_products():
        return Product.query.all()

    @staticmethod
    def get_product(id):
        return Product.query.get_or_404(id)

    @staticmethod
    def delete_product(id):
        product = Product.query.get_or_404(id)
        db.session.delete(product)
        db.session.commit()
        return product

    @staticmethod
    def add_product(product_data):
        new_product = Product(**product_data)
        db.session.add(new_product)
        db.session.commit()
        return new_product

    @staticmethod
    def update_product(id, **kwargs):
        product = Product.query.get_or_404(id)
        for key, value in kwargs.items():
            if value is not None:
                setattr(product, key, value)
        db.session.commit()
        return product

@products_bp.route('/', methods=['GET'])
def get_products():
    """
    Get all products
    ---
    responses:
      200:
        description: A list of all products
    """
    products = ProductService.get_all_products()
    return jsonify([product.to_dict() for product in products])

@products_bp.route('/<int:prod_id>', methods=['GET'])
def get_product(prod_id):
    """
    Get a specific product
    ---
    parameters:
      - name: prod_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: The requested product
      404:
        description: Product not found
    """
    product = ProductService.get_product(prod_id)
    return jsonify(product.to_dict())

@products_bp.route('/<int:prod_id>', methods=['DELETE'])
def delete_product(prod_id):
    """
    Delete a specific product
    ---
    parameters:
      - name: prod_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: The deleted product
      404:
        description: Product not found
    """
    product = ProductService.delete_product(prod_id)
    return jsonify(product.to_dict())

@products_bp.route('/', methods=['POST'])
def add_product():
    """
    Add a new product
    ---
    parameters:
      - name: product
        in: body
        required: true
        schema:
          id: Product
          required:
            - name
            - price
          properties:
            name:
              type: string
            description:
              type: string
            image:
              type: string
            price:
              type: number
            pedidos_id:
              type: integer
    responses:
      201:
        description: The newly created product
    """
    product_data = request.json
    new_product = ProductService.add_product(product_data)
    return jsonify(new_product.to_dict()), 201

@products_bp.route('/<int:prod_id>', methods=['PUT'])
def update_product(prod_id):
    """
    Update a specific product
    ---
    parameters:
      - name: prod_id
        in: path
        type: integer
        required: true
      - name: product
        in: body
        schema:
          id: ProductUpdate
          properties:
            name:
              type: string
            description:
              type: string
            image:
              type: string
            price:
              type: number
            pedidos_id:
              type: integer
    responses:
      200:
        description: The updated product
      404:
        description: Product not found
    """
    product_data = request.json
    updated_product = ProductService.update_product(prod_id, **product_data)
    return jsonify(updated_product.to_dict())