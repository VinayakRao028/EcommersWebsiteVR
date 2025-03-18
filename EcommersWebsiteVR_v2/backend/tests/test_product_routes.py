import unittest
from unittest.mock import Mock, patch
from flask import Flask, json
from app.routes.product_routes import product_routes
from app.models.product_model import Product
from app.services.product_service import ProductService

class TestProductRoutes(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(product_routes)
        self.client = self.app.test_client()
        self.product_service = ProductService()

    def create_mock_product(self, id=1, name="Test Product", description="Test Description", image="test.jpg", price=10.0, orders_id=1):
        product = Mock(spec=Product)
        product.id = id
        product.name = name
        product.description = description
        product.image = image
        product.price = price
        product.orders_id = orders_id
        product.to_dict.return_value = {
            'id': id,
            'name': name,
            'description': description,
            'image': image,
            'price': price,
            'orders_id': orders_id
        }
        return product

    @patch.object(ProductService, 'get_all_products')
    def test_get_products(self, mock_get_all_products):
        # Arrange
        mock_products = [self.create_mock_product(), self.create_mock_product(id=2, name="Product 2")]
        mock_get_all_products.return_value = [product.to_dict() for product in mock_products]

        # Act
        response = self.client.get('/')

        # Assert
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)
        self.assertEqual(data[0]['name'], "Test Product")
        self.assertEqual(data[1]['name'], "Product 2")

    @patch.object(ProductService, 'get_product')
    def test_get_product_success(self, mock_get_product):
        # Arrange
        mock_product = self.create_mock_product()
        mock_get_product.return_value = mock_product.to_dict()

        # Act
        response = self.client.get('/1')

        # Assert
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], "Test Product")

    @patch.object(ProductService, 'get_product')
    def test_get_product_not_found(self, mock_get_product):
        # Arrange
        mock_get_product.return_value = None

        # Act
        response = self.client.get('/999')

        # Assert
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertEqual(data['error'], "Product not found")

    @patch.object(ProductService, 'delete_product')
    def test_delete_product_success(self, mock_delete_product):
        # Arrange
        mock_product = self.create_mock_product()
        mock_delete_product.return_value = mock_product.to_dict()

        # Act
        response = self.client.delete('/1')

        # Assert
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], "Test Product")

    @patch.object(ProductService, 'delete_product')
    def test_delete_product_not_found(self, mock_delete_product):
        # Arrange
        mock_delete_product.return_value = None

        # Act
        response = self.client.delete('/999')

        # Assert
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertEqual(data['error'], "Product not found")

    @patch.object(ProductService, 'add_product')
    def test_add_product(self, mock_add_product):
        # Arrange
        new_product_data = {
            "name": "New Product",
            "description": "New Description",
            "image": "new.jpg",
            "price": 15.0,
            "orders_id": 2
        }
        mock_new_product = self.create_mock_product(**new_product_data)
        mock_add_product.return_value = mock_new_product.to_dict()

        # Act
        response = self.client.post('/', json=new_product_data)

        # Assert
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['name'], "New Product")
        self.assertEqual(data['price'], 15.0)

    @patch.object(ProductService, 'update_product')
    def test_update_product_success(self, mock_update_product):
        # Arrange
        updated_product_data = {
            "name": "Updated Product",
            "description": "Updated Description",
            "image": "updated.jpg",
            "price": 20.0,
            "orders_id": 3
        }
        mock_updated_product = self.create_mock_product(**updated_product_data)
        mock_update_product.return_value = mock_updated_product.to_dict()

        # Act
        response = self.client.put('/1', json=updated_product_data)

        # Assert
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], "Updated Product")
        self.assertEqual(data['price'], 20.0)

    @patch.object(ProductService, 'update_product')
    def test_update_product_not_found(self, mock_update_product):
        # Arrange
        mock_update_product.return_value = None

        # Act
        response = self.client.put('/999', json={"name": "Non-existent Product"})

        # Assert
        self.assertEqual(response.status_code, 404)
        data = json.loads(response.data)
        self.assertEqual(data['error'], "Product not found")

if __name__ == '__main__':
    unittest.main()