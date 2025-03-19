from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from models import Producto
from database import engine

productos_bp = Blueprint('productos', __name__, url_prefix='/api/productos')

class ProductoService:
    def __init__(self, session: Session):
        self.session = session

    def get_all_products(self):
        return self.session.query(Producto).all()

    def get_product(self, id: int):
        return self.session.query(Producto).filter(Producto.id == id).first()

    def delete_product(self, id: int):
        producto = self.get_product(id)
        if producto:
            self.session.delete(producto)
            self.session.commit()
        return producto

    def add_product(self, producto: Producto):
        self.session.add(producto)
        self.session.commit()
        return producto

    def update_product(self, id: int, nombre: str = None, descripcion: str = None,
                       imagen: str = None, precio: float = None, pedidos_id: int = None):
        producto = self.get_product(id)
        if producto:
            if nombre:
                producto.nombre = nombre
            if descripcion:
                producto.descripcion = descripcion
            if imagen:
                producto.imagen = imagen
            if precio:
                producto.precio = precio
            if pedidos_id:
                producto.pedidos_id = pedidos_id
            self.session.commit()
        return producto

@productos_bp.route('', methods=['GET'])
def get_productos():
    """
    Get all products
    ---
    responses:
      200:
        description: A list of all products
    """
    with Session(engine) as session:
        producto_service = ProductoService(session)
        productos = producto_service.get_all_products()
    return jsonify([producto.to_dict() for producto in productos])

@productos_bp.route('/<int:prod_id>', methods=['GET'])
def get_producto(prod_id):
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
    with Session(engine) as session:
        producto_service = ProductoService(session)
        producto = producto_service.get_product(prod_id)
    if producto:
        return jsonify(producto.to_dict())
    return jsonify({"error": "Product not found"}), 404

@productos_bp.route('/<int:prod_id>', methods=['DELETE'])
def delete_producto(prod_id):
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
    with Session(engine) as session:
        producto_service = ProductoService(session)
        producto = producto_service.delete_product(prod_id)
    if producto:
        return jsonify(producto.to_dict())
    return jsonify({"error": "Product not found"}), 404

@productos_bp.route('', methods=['POST'])
def add_producto():
    """
    Add a new product
    ---
    parameters:
      - name: producto
        in: body
        required: true
        schema:
          id: Producto
          properties:
            nombre:
              type: string
            descripcion:
              type: string
            imagen:
              type: string
            precio:
              type: number
            pedidos_id:
              type: integer
    responses:
      201:
        description: The newly created product
    """
    data = request.json
    nuevo_producto = Producto(**data)
    with Session(engine) as session:
        producto_service = ProductoService(session)
        producto = producto_service.add_product(nuevo_producto)
    return jsonify(producto.to_dict()), 201

@productos_bp.route('/<int:prod_id>', methods=['PUT'])
def update_producto(prod_id):
    """
    Update a specific product
    ---
    parameters:
      - name: prod_id
        in: path
        type: integer
        required: true
      - name: producto
        in: body
        required: true
        schema:
          id: ProductoUpdate
          properties:
            nombre:
              type: string
            descripcion:
              type: string
            imagen:
              type: string
            precio:
              type: number
            pedidos_id:
              type: integer
    responses:
      200:
        description: The updated product
      404:
        description: Product not found
    """
    data = request.json
    with Session(engine) as session:
        producto_service = ProductoService(session)
        producto = producto_service.update_product(prod_id, **data)
    if producto:
        return jsonify(producto.to_dict())
    return jsonify({"error": "Product not found"}), 404