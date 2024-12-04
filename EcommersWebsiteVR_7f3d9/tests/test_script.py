import unittest
from unittest.mock import patch
import sys
import os

# Add the parent directory to the Python path to import the script
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import script

class TestScript(unittest.TestCase):
    @patch('builtins.print')
    def test_on_bar_click(self, mock_print):
        script.setup_event_listeners()
        script.on_bar_click()
        mock_print.assert_called_with("Navbar is now active")

    @patch('builtins.print')
    def test_on_close_click(self, mock_print):
        script.setup_event_listeners()
        script.on_close_click()
        mock_print.assert_called_with("Navbar is now inactive")

if __name__ == '__main__':
    unittest.main()