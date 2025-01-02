import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

// Mock CSS import
jest.mock('../styles/global.css', () => ({}));

// Component implementation
const Home: React.FC = () => {
  return (
    <div>
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button><a href="/shop">Shop Now</a></button>
      </section>

      <section id="feature" className="section-p1">
        {[
          { img: 'f1.png', text: 'Free Shipping' },
          { img: 'f2.png', text: 'Online Order' },
          { img: 'f3.png', text: 'Save Money' },
          { img: 'f4.png', text: 'Promotions' },
          { img: 'f5.png', text: 'Happy Sell' },
          { img: 'f6.png', text: '24/7 Support' }
        ].map((feature, index) => (
          <div key={index} className="fe-box">
            <img src={`/images/features/${feature.img}`} alt={feature.text} />
            <h6>{feature.text}</h6>
          </div>
        ))}
      </section>

      <section id="products1" className="section-p1">    
        <h2>Featured Products</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="pro">
              <img src={`/images/products/f${index + 1}.jpg`} alt={`Product ${index + 1}`} />
              <div className="desc">
                <span>adidas</span>
                <h5>Cartoon Astronaut T-shirt</h5>
                <div className="stat">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <h4>$78</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart"></i></a>
            </div>
          ))}
        </div>
      </section>

      <section id="banner" className="section-m1">
        <h4>Repair service</h4>
        <h2>Up to <span> 70% off </span> All t-shirts & Accessories</h2>
        <button className="normal">Explore More</button>
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
describe('Home Component', () => {
  beforeEach(() => {
    render(<Home />);
  });

  test('renders hero section', () => {
    expect(screen.getByText('Trade-in-offer')).toBeInTheDocument();
    expect(screen.getByText('Super value deals')).toBeInTheDocument();
    expect(screen.getByText('On all products')).toBeInTheDocument();
    expect(screen.getByText('Save more with coupons & up to 70% off!')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  test('renders feature section', () => {
    const features = ['Free Shipping', 'Online Order', 'Save Money', 'Promotions', 'Happy Sell', '24/7 Support'];
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('renders featured products section', () => {
    expect(screen.getByText('Featured Products')).toBeInTheDocument();
    expect(screen.getByText('Summer Collections New Modern Design')).toBeInTheDocument();
    expect(screen.getAllByText('Cartoon Astronaut T-shirt').length).toBe(8);
    expect(screen.getAllByText('$78').length).toBe(8);
  });

  test('renders banner section', () => {
    expect(screen.getByText('Repair service')).toBeInTheDocument();
    expect(screen.getByText('Up to')).toBeInTheDocument();
    expect(screen.getByText('70% off')).toBeInTheDocument();
    expect(screen.getByText('All t-shirts & Accessories')).toBeInTheDocument();
    expect(screen.getByText('Explore More')).toBeInTheDocument();
  });

  test('renders newsletter section', () => {
    expect(screen.getByText('Sign Up For Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Get Email updates about our latest shop and')).toBeInTheDocument();
    expect(screen.getByText('special offers')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your email address')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('Shop Now button links to /shop', () => {
    const shopNowButton = screen.getByText('Shop Now');
    expect(shopNowButton.closest('a')).toHaveAttribute('href', '/shop');
  });

  test('newsletter form is interactive', () => {
    const input = screen.getByPlaceholderText('your email address');
    const signUpButton = screen.getByText('Sign Up');

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    expect(input).toHaveValue('test@example.com');

    fireEvent.click(signUpButton);
    // Add assertions for form submission if implemented
  });
});

// Run the tests
describe('Home Component', () => {
  // ... (previous test cases remain the same)
});