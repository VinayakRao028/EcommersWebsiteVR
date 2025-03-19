import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, json
from werkzeug.exceptions import NotFound

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

class MockDB:
    def __init__(self):
        self.session = MagicMock()

class MockProductService:
    def __init__(self):
        self.products = [
            MockProduct(1, "Product 1", "Description 1", "image1.jpg", 10.99, 1),
            MockProduct(2, "Product 2", "Description 2", "image2.jpg", 20.99, 2)
        ]

    def get_all_products(self):
        return self.products

    def get_product(self, id):
        product = next((p for p in self.products if p.id == id), None)
        if not product:
            raise NotFound(f"Product {id} doesn't exist")
        return product

    def add_product(self, product_data):
        new_product = MockProduct(
            len(self.products) + 1,
            product_data['name'],
            product_data['description'],
            product_data['image'],
            product_data['price'],
            product_data['pedidos_id']
        )
        self.products.append(new_product)
        return new_product

    def update_product(self, id, **kwargs):
        product = self.get_product(id)
        for key, value in kwargs.items():
            if value is not None:
                setattr(product, key, value)
        return product

    def delete_product(self, id):
        product = self.get_product(id)
        self.products.remove(product)
        return product

class MockBlogService:
    def __init__(self):
        self.blogs = [
            {'id': 1, 'title': 'Blog 1', 'content': 'Content 1', 'author': 'Author 1'},
            {'id': 2, 'title': 'Blog 2', 'content': 'Content 2', 'author': 'Author 2'}
        ]
        self.counter = 3

    def get_all_blogs(self):
        return self.blogs

    def get_blog(self, blog_id):
        blog = next((b for b in self.blogs if b['id'] == blog_id), None)
        if not blog:
            raise NotFound(f"Blog {blog_id} doesn't exist")
        return blog

    def add_blog(self, blog):
        new_blog = blog.copy()
        new_blog['id'] = self.counter
        self.counter += 1
        self.blogs.append(new_blog)
        return new_blog

    def update_blog(self, blog_id, title, content, author):
        blog = self.get_blog(blog_id)
        blog['title'] = title or blog['title']
        blog['content'] = content or blog['content']
        blog['author'] = author or blog['author']
        return blog

    def delete_blog(self, blog_id):
        blog = self.get_blog(blog_id)
        self.blogs.remove(blog)
        return blog

# Test cases
class TestProductAPI(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

        # Mock the ProductService
        self.patcher = patch('app.ProductService', MockProductService)
        self.mock_product_service = self.patcher.start()

    def tearDown(self):
        self.patcher.stop()

    def test_get_all_products(self):
        response = self.client.get('/api/productos')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)

    def test_get_product(self):
        response = self.client.get('/api/productos/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'Product 1')

    def test_get_nonexistent_product(self):
        response = self.client.get('/api/productos/999')
        self.assertEqual(response.status_code, 404)

    def test_add_product(self):
        new_product = {
            'name': 'New Product',
            'description': 'New Description',
            'image': 'new_image.jpg',
            'price': 15.99,
            'pedidos_id': 3
        }
        response = self.client.post('/api/productos', json=new_product)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'New Product')

    def test_update_product(self):
        update_data = {'name': 'Updated Product'}
        response = self.client.put('/api/productos/1', json=update_data)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'Updated Product')

    def test_delete_product(self):
        response = self.client.delete('/api/productos/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['name'], 'Product 1')

class TestBlogAPI(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

        # Mock the BlogService
        self.patcher = patch('blog.BlogService', MockBlogService)
        self.mock_blog_service = self.patcher.start()

    def tearDown(self):
        self.patcher.stop()

    def test_get_all_blogs(self):
        response = self.client.get('/api/blog/')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(len(data), 2)

    def test_get_blog(self):
        response = self.client.get('/api/blog/1')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['title'], 'Blog 1')

    def test_get_nonexistent_blog(self):
        response = self.client.get('/api/blog/999')
        self.assertEqual(response.status_code, 404)

    def test_add_blog(self):
        new_blog = {
            'title': 'New Blog',
            'content': 'New Content',
            'author': 'New Author'
        }
        response = self.client.post('/api/blog/', json=new_blog)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data['title'], 'New Blog')

    def test_update_blog(self):
        update_data = {'title': 'Updated Blog'}
        response = self.client.put('/api/blog/1', json=update_data)
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['title'], 'Updated Blog')

    def test_delete_blog(self):
        response = self.client.delete('/api/blog/1')
        self.assertEqual(response.status_code, 204)

if __name__ == '__main__':
    unittest.main()