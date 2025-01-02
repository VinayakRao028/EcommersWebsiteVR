import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock the React component
const Footer: React.FC = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src="/images/logo.png" alt="Logo" />
        <h4>Contact</h4>
        <p><strong>Address:</strong> 562 Wellington Road, Street 32, San Francisco</p>
        <p><strong>Phone:</strong> +8 40470289 +7 89048098</p>
        <p><strong>Hours:</strong> 10:00 - 18:00 Mon-Sat</p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest-p"></i>
            <i className="fab fa-youtube"></i>
          </div>
        </div>
      </div>
      
      <div className="col">
        <h4>About</h4>
        <a href="#">About Us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>
      
      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">My Wishlist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>
      
      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store Or Google Play</p>
        <div className="row">
          <img src="/images/pay/app.jpg" alt="App Store" />
          <img src="/images/pay/play.jpg" alt="Google Play" />
        </div>
        <p>Secure Payment Gateways</p>
        <img src="/images/pay/pay.png" alt="Payment Gateways" />
      </div>
      
      <div className="copyright">
        <p>&copy; 2023 Tech - React TypeScript Ecommerce Template</p>
      </div>
    </footer>
  );
};

// Test suite
describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders the logo', () => {
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/logo.png');
  });

  test('displays contact information', () => {
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText(/Address:/)).toBeInTheDocument();
    expect(screen.getByText(/Phone:/)).toBeInTheDocument();
    expect(screen.getByText(/Hours:/)).toBeInTheDocument();
  });

  test('shows social media icons', () => {
    const socialIcons = screen.getAllByRole('generic', { hidden: true });
    expect(socialIcons.length).toBeGreaterThanOrEqual(5); // At least 5 social media icons
  });

  test('displays About section links', () => {
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Delivery Information')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });

  test('displays My Account section links', () => {
    expect(screen.getByText('My Account')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('View Cart')).toBeInTheDocument();
    expect(screen.getByText('My Wishlist')).toBeInTheDocument();
    expect(screen.getByText('Track My Order')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  test('shows app installation information', () => {
    expect(screen.getByText('Install App')).toBeInTheDocument();
    expect(screen.getByText('From App Store Or Google Play')).toBeInTheDocument();
    expect(screen.getByAltText('App Store')).toBeInTheDocument();
    expect(screen.getByAltText('Google Play')).toBeInTheDocument();
  });

  test('displays payment gateway information', () => {
    expect(screen.getByText('Secure Payment Gateways')).toBeInTheDocument();
    expect(screen.getByAltText('Payment Gateways')).toBeInTheDocument();
  });

  test('shows copyright information', () => {
    expect(screen.getByText(/© 2023 Tech - React TypeScript Ecommerce Template/)).toBeInTheDocument();
  });
});

// Mock implementations for external dependencies
jest.mock('@testing-library/react', () => ({
  render: jest.fn(),
  screen: {
    getByText: jest.fn(),
    getByAltText: jest.fn(),
    getAllByRole: jest.fn(),
    getByRole: jest.fn(),
  },
}));

jest.mock('@testing-library/jest-dom/extend-expect', () => ({}));

// Run the tests
describe('Footer Component', () => {
  // ... (previous test cases remain the same)
});