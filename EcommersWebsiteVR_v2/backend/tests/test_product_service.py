import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, json
from app.routes.product_routes import product_routes

class TestProductRoutes(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(product_routes)
        self.client = self.app.test_client()

        # Mock data
        self.mock_product = {
            'id': 1,
            'name': 'Test Product',
            'description': 'This is a test product',
            'image': 'test.jpg',
            'price': 9.99,
            'orders_id': None
        }
        self.mock_products = [self.mock_product]

    @patch('app.routes.product_routes.product_service')
    def test_get_products(self, mock_service):
        mock_service.get_all_products.return_value = self.mock_products
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), self.mock_products)

    @patch('app.routes.product_routes.product_service')
    def test_get_product_success(self, mock_service):
        mock_service.get_product.return_value = self.mock_product
        response = self.client.get('/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), self.mock_product)

    @patch('app.routes.product_routes.product_service')
    def test_get_product_not_found(self, mock_service):
        mock_service.get_product.return_value = None
        response = self.client.get('/999')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(json.loads(response.data), {"error": "Product not found"})

    @patch('app.routes.product_routes.product_service')
    def test_delete_product_success(self, mock_service):
        mock_service.delete_product.return_value = self.mock_product
        response = self.client.delete('/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), self.mock_product)

    @patch('app.routes.product_routes.product_service')
    def test_delete_product_not_found(self, mock_service):
        mock_service.delete_product.return_value = None
        response = self.client.delete('/999')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(json.loads(response.data), {"error": "Product not found"})

    @patch('app.routes.product_routes.product_service')
    def test_add_product(self, mock_service):
        new_product = {
            'name': 'New Product',
            'description': 'This is a new product',
            'image': 'new.jpg',
            'price': 19.99
        }
        mock_service.add_product.return_value = {**new_product, 'id': 2}
        response = self.client.post('/', json=new_product)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(json.loads(response.data), {**new_product, 'id': 2})

    @patch('app.routes.product_routes.product_service')
    def test_update_product_success(self, mock_service):
        updated_product = {**self.mock_product, 'name': 'Updated Product'}
        mock_service.update_product.return_value = updated_product
        response = self.client.put('/1', json=updated_product)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), updated_product)

    @patch('app.routes.product_routes.product_service')
    def test_update_product_not_found(self, mock_service):
        mock_service.update_product.return_value = None
        response = self.client.put('/999', json=self.mock_product)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(json.loads(response.data), {"error": "Product not found"})

# Mock classes to make the test file self-contained
class Product:
    @staticmethod
    def schema(many=False):
        return {'type': 'object'}

class ProductService:
    def get_all_products(self):
        pass

    def get_product(self, prod_id):
        pass

    def delete_product(self, prod_id):
        pass

    def add_product(self, product_data):
        pass

    def update_product(self, prod_id, product_data):
        pass

if __name__ == '__main__':
    unittest.main()