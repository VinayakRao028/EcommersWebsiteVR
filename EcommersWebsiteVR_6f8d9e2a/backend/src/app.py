from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flasgger import Swagger
from models import Producto
from services import ProductoService

app = Flask(__name__)
api = Api(app)
swagger = Swagger(app)

class ProductosController(Resource):
    def __init__(self):
        self.producto_service = ProductoService()

    def get(self, prod_id=None):
        """
        Get all products or a specific product
        ---
        parameters:
          - name: prod_id
            in: path
            type: integer
            required: false
            description: The ID of the product
        responses:
          200:
            description: A list of products or a single product
            schema:
              type: array
              items:
                $ref: '#/definitions/Producto'
        """
        if prod_id is None:
            return jsonify(self.producto_service.get_all_products())
        return jsonify(self.producto_service.get_product(prod_id))

    def post(self):
        """
        Add a new product
        ---
        parameters:
          - in: body
            name: body
            schema:
              $ref: '#/definitions/Producto'
        responses:
          200:
            description: The created product
            schema:
              $ref: '#/definitions/Producto'
        """
        producto = Producto(**request.json)
        return jsonify(self.producto_service.add_product(producto))

    def delete(self, prod_id):
        """
        Delete a product
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
              $ref: '#/definitions/Producto'
        """
        return jsonify(self.producto_service.delete_product(prod_id))

    def put(self, prod_id):
        """
        Update a product
        ---
        parameters:
          - name: prod_id
            in: path
            type: integer
            required: true
            description: The ID of the product to update
          - in: body
            name: body
            schema:
              $ref: '#/definitions/Producto'
        responses:
          200:
            description: The updated product
            schema:
              $ref: '#/definitions/Producto'
        """
        data = request.json
        return jsonify(self.producto_service.update_product(
            prod_id,
            data.get('nombre'),
            data.get('descripcion'),
            data.get('imagen'),
            data.get('precio'),
            data.get('pedidos_id')
        ))

api.add_resource(ProductosController, '/api/productos', '/api/productos/<int:prod_id>')

if __name__ == '__main__':
    app.run(debug=True)