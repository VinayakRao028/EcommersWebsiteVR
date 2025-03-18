import unittest
from unittest.mock import Mock, patch
from flask import Flask, json

# Mock implementations
class MockProduct:
    def __init__(self, id, name, description, image, price, orders_id=None):
        self.id = id
        self.name = name
        self.description = description
        self.image = image
        self.price = price
        self.orders_id = orders_id

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'price': self.price,
            'orders_id': self.orders_id
        }

class MockProductService:
    def __init__(self):
        self.products = []

    def get_all_products(self):
        return [product.to_dict() for product in self.products]

    def get_product(self, prod_id):
        for product in self.products:
            if product.id == prod_id:
                return product.to_dict()
        return None

    def delete_product(self, prod_id):
        for i, product in enumerate(self.products):
            if product.id == prod_id:
                return self.products.pop(i).to_dict()
        return None

    def add_product(self, product_data):
        new_product = MockProduct(
            id=len(self.products) + 1,
            name=product_data['name'],
            description=product_data['description'],
            image=product_data['image'],
            price=product_data['price'],
            orders_id=product_data.get('orders_id')
        )
        self.products.append(new_product)
        return new_product.to_dict()

    def update_product(self, prod_id, product_data):
        for product in self.products:
            if product.id == prod_id:
                product.name = product_data['name']
                product.description = product_data['description']
                product.image = product_data['image']
                product.price = product_data['price']
                product.orders_id = product_data.get('orders_id')
                return product.to_dict()
        return None

# Import the product routes (mocking the actual imports)
product_routes = Mock()
product_service = MockProductService()

# Helper functions
def create_mock_products():
    return [
        MockProduct(1, "Product 1", "Description 1", "image1.jpg", 10.99),
        MockProduct(2, "Product 2", "Description 2", "image2.jpg", 20.99),
        MockProduct(3, "Product 3", "Description 3", "image3.jpg", 30.99),
    ]

def compare_products(product1, product2):
    return all(product1[key] == product2[key] for key in product1.keys())

# Test class
class TestProductRoutes(unittest.TestCase):
    def setUp(self):
        self.app = Flask(__name__)
        self.app.register_blueprint(product_routes)
        self.client = self.app.test_client()
        self.product_service = product_service
        self.product_service.products = create_mock_products()

    def test_get_products(self):
        with patch('app.services.product_service.ProductService.get_all_products', 
                   return_value=self.product_service.get_all_products()):
            response = self.client.get('/')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertEqual(len(data), 3)
            self.assertTrue(all(compare_products(data[i], self.product_service.products[i].to_dict()) 
                                for i in range(len(data))))

    def test_get_product_existing(self):
        with patch('app.services.product_service.ProductService.get_product', 
                   side_effect=self.product_service.get_product):
            response = self.client.get('/1')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertTrue(compare_products(data, self.product_service.products[0].to_dict()))

    def test_get_product_non_existing(self):
        with patch('app.services.product_service.ProductService.get_product', 
                   side_effect=self.product_service.get_product):
            response = self.client.get('/999')
            self.assertEqual(response.status_code, 404)
            data = json.loads(response.data)
            self.assertEqual(data, {"error": "Product not found"})

    def test_delete_product_existing(self):
        with patch('app.services.product_service.ProductService.delete_product', 
                   side_effect=self.product_service.delete_product):
            response = self.client.delete('/2')
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertTrue(compare_products(data, self.product_service.products[1].to_dict()))
            self.assertEqual(len(self.product_service.products), 2)

    def test_delete_product_non_existing(self):
        with patch('app.services.product_service.ProductService.delete_product', 
                   side_effect=self.product_service.delete_product):
            response = self.client.delete('/999')
            self.assertEqual(response.status_code, 404)
            data = json.loads(response.data)
            self.assertEqual(data, {"error": "Product not found"})

    def test_add_product(self):
        new_product = {
            "name": "New Product",
            "description": "New Description",
            "image": "new_image.jpg",
            "price": 40.99
        }
        with patch('app.services.product_service.ProductService.add_product', 
                   side_effect=self.product_service.add_product):
            response = self.client.post('/', json=new_product)
            self.assertEqual(response.status_code, 201)
            data = json.loads(response.data)
            self.assertTrue(compare_products(data, {**new_product, "id": 4, "orders_id": None}))
            self.assertEqual(len(self.product_service.products), 4)

    def test_update_product_existing(self):
        updated_product = {
            "name": "Updated Product",
            "description": "Updated Description",
            "image": "updated_image.jpg",
            "price": 50.99
        }
        with patch('app.services.product_service.ProductService.update_product', 
                   side_effect=self.product_service.update_product):
            response = self.client.put('/1', json=updated_product)
            self.assertEqual(response.status_code, 200)
            data = json.loads(response.data)
            self.assertTrue(compare_products(data, {**updated_product, "id": 1, "orders_id": None}))

    def test_update_product_non_existing(self):
        updated_product = {
            "name": "Updated Product",
            "description": "Updated Description",
            "image": "updated_image.jpg",
            "price": 50.99
        }
        with patch('app.services.product_service.ProductService.update_product', 
                   side_effect=self.product_service.update_product):
            response = self.client.put('/999', json=updated_product)
            self.assertEqual(response.status_code, 404)
            data = json.loads(response.data)
            self.assertEqual(data, {"error": "Product not found"})

if __name__ == '__main__':
    unittest.main()