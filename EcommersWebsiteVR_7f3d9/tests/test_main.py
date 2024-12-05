import unittest
from unittest.mock import patch, MagicMock
from flask import Flask, render_template

# Implementation code
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.context_processor
def inject_script():
    def main_script():
        return """
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            const bar = document.getElementById('bar');
            const close = document.getElementById('close');
            const nav = document.getElementById('navbar');

            if (bar) {
                bar.addEventListener('click', function() {
                    nav.classList.add('active');
                });
            }

            if (close) {
                close.addEventListener('click', function() {
                    nav.classList.remove('active');
                });
            }
        });
        </script>
        """
    return dict(main_script=main_script)

# Test suite
class TestFlaskApp(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True 

    def test_index_route(self):
        with patch('flask.render_template') as mock_render:
            mock_render.return_value = 'Mocked Index Page'
            response = self.app.get('/')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.data.decode(), 'Mocked Index Page')
            mock_render.assert_called_once_with('index.html')

    def test_inject_script(self):
        with app.app_context():
            context_processor = inject_script()
            self.assertIn('main_script', context_processor)
            script = context_processor['main_script']()
            self.assertIsInstance(script, str)
            self.assertIn('document.addEventListener', script)
            self.assertIn("getElementById('bar')", script)
            self.assertIn("getElementById('close')", script)
            self.assertIn("getElementById('navbar')", script)
            self.assertIn("classList.add('active')", script)
            self.assertIn("classList.remove('active')", script)

    @patch('flask.render_template')
    def test_index_with_injected_script(self, mock_render):
        mock_render.return_value = 'Mocked Page with {{ main_script() }}'
        with app.test_request_context('/'):
            response = index()
            self.assertIn('Mocked Page with', response)
            self.assertIn('document.addEventListener', response)

if __name__ == '__main__':
    unittest.main()