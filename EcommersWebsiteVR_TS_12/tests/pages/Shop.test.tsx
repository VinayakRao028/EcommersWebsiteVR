import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

// Mock CSS module
jest.mock('../styles/global.css', () => ({}));

// Component implementation
const Shop: React.FC = () => {
  const products = [
    { id: 1, image: 'images/products/f1.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 2, image: 'images/products/f2.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
  ];

  return (
    <div>
      <section id="page-header">
        <h2>#Stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      <section id="products1" className="section-p1">    
        <div className="pro-container">
          {products.map((product) => (
            <div key={product.id} className="pro" onClick={() => window.location.href='/sproduct'}>
              <img src={product.image} alt={product.name} />
              <div className="desc">
                <span>{product.brand}</span>
                <h5>{product.name}</h5>
                <div className="stat">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <h4>${product.price}</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart"></i></a>
            </div>
          ))}
        </div>
      </section>

      <section id="pagination" className="section-p1">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#"><i className="fal fa-long-arrow-alt-right"></i></a>
      </section>

      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sign Up For Newsletter</h4>
          <p>Get Email updates about our latest shop and <span>special offers</span></p>
        </div>
        <div className="form">
          <input type="text" placeholder="your email address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>
    </div>
  );
};

// Test suite
describe('Shop Component', () => {
  beforeEach(() => {
    render(<Shop />);
  });

  test('renders page header', () => {
    expect(screen.getByText('#Stayhome')).toBeInTheDocument();
    expect(screen.getByText('Save more with coupons & up to 70% off!')).toBeInTheDocument();
  });

  test('renders product list', () => {
    expect(screen.getAllByText('Cartoon Astronaut T-shirt')).toHaveLength(2);
    expect(screen.getAllByText('adidas')).toHaveLength(2);
    expect(screen.getAllByText('$78')).toHaveLength(2);
  });

  test('renders pagination', () => {
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('renders newsletter section', () => {
    expect(screen.getByText('Sign Up For Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your email address')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('product click redirects to product page', () => {
    const product = screen.getAllByText('Cartoon Astronaut T-shirt')[0];
    fireEvent.click(product);
    expect(window.location.href).toBe('/sproduct');
  });
});

// Mock implementations for external dependencies
jest.mock('@testing-library/react', () => ({
  render: jest.fn(),
  screen: {
    getByText: jest.fn(),
    getAllByText: jest.fn(),
    getByPlaceholderText: jest.fn(),
  },
  fireEvent: {
    click: jest.fn(),
  },
}));

jest.mock('@testing-library/jest-dom/extend-expect', () => ({}));

// Run the tests
describe('Shop Component', () => {
  // ... (previous test cases remain the same)
});