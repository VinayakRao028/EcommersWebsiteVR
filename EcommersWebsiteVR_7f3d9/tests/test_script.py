import unittest
from flask import Flask
from app import app  # Assuming the main Flask app is in app.py

class TestEcommerceApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True 

    def test_home_page(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Welcome to our Ecommerce Store', response.data)

    def test_shop_page(self):
        response = self.app.get('/shop')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Our Products', response.data)

    def test_cart_page(self):
        response = self.app.get('/cart')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Your Shopping Cart', response.data)

    def test_about_page(self):
        response = self.app.get('/about')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'About Us', response.data)

    def test_contact_page(self):
        response = self.app.get('/contact')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Contact Us', response.data)

    def test_invalid_page(self):
        response = self.app.get('/nonexistent')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()