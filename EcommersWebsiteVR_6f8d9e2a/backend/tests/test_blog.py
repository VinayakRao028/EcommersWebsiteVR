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
        self.api = Api(self.app)

    def test_get_all_products(self):
        with patch('products.ProductService.get_all_products') as mock_get_all:
            mock_get_all.return_value = [
                MockProduct(1, "Product 1", "Description 1", "image1.jpg", 10.99, 1),
                MockProduct(2, "Product 2", "Description 2", "image2.jpg", 20.99, 2)
            ]

            response = self.client.get('/api/productos')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(len(data), 2)
            self.assertEqual(data[0]['name'], "Product 1")
            self.assertEqual(data[1]['name'], "Product 2")

    def test_get_product(self):
        with patch('products.ProductService.get_product') as mock_get:
            mock_get.return_value = MockProduct(1, "Product 1", "Description 1", "image1.jpg", 10.99, 1)

            response = self.client.get('/api/productos/1')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['name'], "Product 1")

    def test_add_product(self):
        with patch('products.ProductService.add_product') as mock_add:
            new_product = MockProduct(3, "New Product", "New Description", "new_image.jpg", 30.99, 3)
            mock_add.return_value = new_product

            response = self.client.post('/api/productos', json={
                'name': "New Product",
                'description': "New Description",
                'image': "new_image.jpg",
                'price': 30.99,
                'pedidos_id': 3
            })
            self.assertEqual(response.status_code, 201)
            data = json.loads(response.data)
            self.assertEqual(data['name'], "New Product")

    def test_update_product(self):
        with patch('products.ProductService.update_product') as mock_update:
            updated_product = MockProduct(1, "Updated Product", "Updated Description", "updated_image.jpg", 15.99, 1)
            mock_update.return_value = updated_product

            response = self.client.put('/api/productos/1', json={
                'name': "Updated Product",
                'description': "Updated Description",
                'image': "updated_image.jpg",
                'price': 15.99
            })
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['name'], "Updated Product")

    def test_delete_product(self):
        with patch('products.ProductService.delete_product') as mock_delete:
            deleted_product = MockProduct(1, "Product 1", "Description 1", "image1.jpg", 10.99, 1)
            mock_delete.return_value = deleted_product

            response = self.client.delete('/api/productos/1')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['name'], "Product 1")

    def test_blog_operations(self):
        blog_service = MagicMock()
        blog_service.get_all_blogs.return_value = [
            {'id': 1, 'title': 'Blog 1', 'content': 'Content 1', 'author': 'Author 1'},
            {'id': 2, 'title': 'Blog 2', 'content': 'Content 2', 'author': 'Author 2'}
        ]
        blog_service.get_blog.return_value = {'id': 1, 'title': 'Blog 1', 'content': 'Content 1', 'author': 'Author 1'}
        blog_service.add_blog.return_value = {'id': 3, 'title': 'New Blog', 'content': 'New Content', 'author': 'New Author'}
        blog_service.update_blog.return_value = {'id': 1, 'title': 'Updated Blog', 'content': 'Updated Content', 'author': 'Updated Author'}
        blog_service.delete_blog.return_value = {'id': 1, 'title': 'Blog 1', 'content': 'Content 1', 'author': 'Author 1'}

        with patch('blog.BlogService', return_value=blog_service):
            # Test get all blogs
            response = self.client.get('/api/blog/')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(len(data), 2)

            # Test get single blog
            response = self.client.get('/api/blog/1')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['title'], 'Blog 1')

            # Test add blog
            response = self.client.post('/api/blog/', json={
                'title': 'New Blog',
                'content': 'New Content',
                'author': 'New Author'
            })
            self.assertEqual(response.status_code, 201)
            data = json.loads(response.data)
            self.assertEqual(data['title'], 'New Blog')

            # Test update blog
            response = self.client.put('/api/blog/1', json={
                'title': 'Updated Blog',
                'content': 'Updated Content',
                'author': 'Updated Author'
            })
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['title'], 'Updated Blog')

            # Test delete blog
            response = self.client.delete('/api/blog/1')
            self.assertEqual(response.status_code, 204)

    def test_database_operations(self):
        mock_session = MockSession()
        
        with patch('database.Session', return_value=mock_session):
            # Test get all products
            response = self.client.get('/api/productos')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(len(data), 2)

            # Test get single product
            response = self.client.get('/api/productos/1')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['name'], 'Product 1')

            # Test add product
            response = self.client.post('/api/productos', json={
                'name': 'New Product',
                'description': 'New Description',
                'image': 'new_image.jpg',
                'price': 30.99,
                'pedidos_id': 3
            })
            self.assertEqual(response.status_code, 201)
            data = json.loads(response.data)
            self.assertEqual(data['name'], 'New Product')

            # Test update product
            response = self.client.put('/api/productos/1', json={
                'name': 'Updated Product',
                'description': 'Updated Description',
                'image': 'updated_image.jpg',
                'price': 15.99
            })
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['name'], 'Updated Product')

            # Test delete product
            response = self.client.delete('/api/productos/1')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(data['name'], 'Product 1')

if __name__ == '__main__':
    unittest.main()