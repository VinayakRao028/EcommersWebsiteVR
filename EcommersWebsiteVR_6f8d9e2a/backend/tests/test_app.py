import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, json
from flask_restx import Api
from sqlalchemy.orm import Session

# Mock implementations
class MockProduct:
    def __init__(self, id, name, description, image, price, pedidos_id):
        self.id = id
        self.name = name
        self.description = description
        self.image = image
        self.price = price
        self.pedidos_id = pedidos_id

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'price': self.price,
            'pedidos_id': self.pedidos_id
        }

class MockSession:
    def __init__(self):
        self.products = [
            MockProduct(1, "Product 1", "Description 1", "image1.jpg", 10.99, 1),
            MockProduct(2, "Product 2", "Description 2", "image2.jpg", 20.99, 2)
        ]

    def query(self, model):
        return self

    def all(self):
        return self.products

    def filter(self, condition):
        return self

    def first(self):
        return self.products[0] if self.products else None

    def delete(self, obj):
        self.products = [p for p in self.products if p.id != obj.id]

    def add(self, obj):
        self.products.append(obj)

    def commit(self):
        pass

# Test cases
class TestEcommerceWebsite(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.client = self.app.test_client()

    @patch('flask_restful.Api')
    @patch('flasgger.Swagger')
    def test_app_initialization(self, mock_swagger, mock_api):
        from app import app, api, swagger
        self.assertIsInstance(app, Flask)
        self.assertTrue(mock_api.called)
        self.assertTrue(mock_swagger.called)

    @patch('products.ProductService')
    def test_get_all_products(self, mock_product_service):
        from products import get_products
        mock_product_service.get_all_products.return_value = [
            MockProduct(1, "Test Product", "Test Description", "test.jpg", 9.99, 1)
        ]
        with self.app.test_request_context():
            response = get_products()
            data = json.loads(response.get_data(as_text=True))
            self.assertEqual(len(data), 1)
            self.assertEqual(data[0]['name'], "Test Product")

    @patch('products.ProductService')
    def test_get_product(self, mock_product_service):
        from products import get_product
        mock_product_service.get_product.return_value = MockProduct(1, "Test Product", "Test Description", "test.jpg", 9.99, 1)
        with self.app.test_request_context():
            response = get_product(1)
            data = json.loads(response.get_data(as_text=True))
            self.assertEqual(data['id'], 1)
            self.assertEqual(data['name'], "Test Product")

    @patch('products.ProductService')
    def test_delete_product(self, mock_product_service):
        from products import delete_product
        mock_product_service.delete_product.return_value = MockProduct(1, "Test Product", "Test Description", "test.jpg", 9.99, 1)
        with self.app.test_request_context():
            response = delete_product(1)
            data = json.loads(response.get_data(as_text=True))
            self.assertEqual(data['id'], 1)
            self.assertEqual(data['name'], "Test Product")

    @patch('products.ProductService')
    def test_add_product(self, mock_product_service):
        from products import add_product
        new_product = MockProduct(3, "New Product", "New Description", "new.jpg", 15.99, 3)
        mock_product_service.add_product.return_value = new_product
        with self.app.test_request_context(json={
            'name': "New Product",
            'description': "New Description",
            'image': "new.jpg",
            'price': 15.99,
            'pedidos_id': 3
        }):
            response = add_product()
            data = json.loads(response.get_data(as_text=True))
            self.assertEqual(response.status_code, 201)
            self.assertEqual(data['name'], "New Product")

    @patch('products.ProductService')
    def test_update_product(self, mock_product_service):
        from products import update_product
        updated_product = MockProduct(1, "Updated Product", "Updated Description", "updated.jpg", 19.99, 1)
        mock_product_service.update_product.return_value = updated_product
        with self.app.test_request_context(json={
            'name': "Updated Product",
            'description': "Updated Description",
            'image': "updated.jpg",
            'price': 19.99
        }):
            response = update_product(1)
            data = json.loads(response.get_data(as_text=True))
            self.assertEqual(data['name'], "Updated Product")
            self.assertEqual(data['price'], 19.99)

    def test_blog_service(self):
        from blog import BlogService
        blog_service = BlogService()
        
        # Test add_blog
        new_blog = blog_service.add_blog({'title': 'Test Blog', 'content': 'Test Content', 'author': 'Test Author'})
        self.assertEqual(new_blog['id'], 1)
        self.assertEqual(new_blog['title'], 'Test Blog')

        # Test get_all_blogs
        blogs = blog_service.get_all_blogs()
        self.assertEqual(len(blogs), 1)

        # Test get_blog
        blog = blog_service.get_blog(1)
        self.assertEqual(blog['title'], 'Test Blog')

        # Test update_blog
        updated_blog = blog_service.update_blog(1, 'Updated Title', 'Updated Content', 'Updated Author')
        self.assertEqual(updated_blog['title'], 'Updated Title')

        # Test delete_blog
        deleted_blog = blog_service.delete_blog(1)
        self.assertEqual(deleted_blog['id'], 1)
        self.assertEqual(len(blog_service.get_all_blogs()), 0)

    @patch('database.Session')
    def test_producto_service(self, mock_session):
        from database import ProductoService
        mock_session_instance = MockSession()
        mock_session.return_value.__enter__.return_value = mock_session_instance
        
        producto_service = ProductoService(mock_session_instance)

        # Test get_all_products
        products = producto_service.get_all_products()
        self.assertEqual(len(products), 2)

        # Test get_product
        product = producto_service.get_product(1)
        self.assertEqual(product.name, "Product 1")

        # Test delete_product
        deleted_product = producto_service.delete_product(1)
        self.assertEqual(deleted_product.id, 1)
        self.assertEqual(len(mock_session_instance.products), 1)

        # Test add_product
        new_product = MockProduct(3, "New Product", "New Description", "new.jpg", 30.99, 3)
        added_product = producto_service.add_product(new_product)
        self.assertEqual(added_product.name, "New Product")
        self.assertEqual(len(mock_session_instance.products), 2)

        # Test update_product
        updated_product = producto_service.update_product(2, nombre="Updated Product", precio=25.99)
        self.assertEqual(updated_product.name, "Updated Product")
        self.assertEqual(updated_product.price, 25.99)

if __name__ == '__main__':
    unittest.main()