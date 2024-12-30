import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock CSS import
jest.mock('../styles/style.css', () => ({}));

// Component implementation
const Home: React.FC = () => {
  return (
    <>
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button><a href="shop.html">Shop Now</a></button>
      </section>

      <section id="feature" className="section-p1">
        {['Free Shipping', 'Online Order', 'Save Money', 'Promotions', 'Happy Sell', '24/7 Support'].map((feature, index) => (
          <div key={index} className="fe-box">
            <img src={`/images/features/f${index + 1}.png`} alt={feature} />
            <h6>{feature}</h6>
          </div>
        ))}
      </section>

      <section id="products1" className="section-p1">    
        <h2>Featured Products</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          <div className="pro">
            <img src="/images/products/f1.jpg" alt="Product" />
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
    </>
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
    expect(screen.getByText('Cartoon Astronaut T-shirt')).toBeInTheDocument();
    expect(screen.getByText('$78')).toBeInTheDocument();
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
});

// Mock implementations
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn(),
}));

const mockRender = (component: React.ReactElement) => {
  const container = document.createElement('div');
  container.innerHTML = component.toString();
  return { container };
};

const mockScreen = {
  getByText: (text: string) => {
    const element = document.body.querySelector(`*:not(script):not(style):contains("${text}")`);
    if (!element) {
      throw new Error(`Unable to find an element with the text: ${text}`);
    }
    return element;
  },
  getByPlaceholderText: (text: string) => {
    const element = document.body.querySelector(`input[placeholder="${text}"]`);
    if (!element) {
      throw new Error(`Unable to find an input with the placeholder text: ${text}`);
    }
    return element;
  },
};

global.render = mockRender as any;
global.screen = mockScreen as any;

// Run the tests
describe('Home Component', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    const { container } = render(<Home />);
    document.body.appendChild(container);
  });

  test('renders hero section', () => {
    expect(screen.getByText('Trade-in-offer')).toBeInTheDocument();
    expect(screen.getByText('Super value deals')).toBeInTheDocument();
    expect(screen.getByText('On all products')).toBeInTheDocument();
    expect(screen.getByText('Save more with coupons & up to 70% off!')).toBeInTheDocument();
    expect(screen.getByText('Shop Now')).toBeInTheDocument();
  });

  // ... (other tests)

  test('renders newsletter section', () => {
    expect(screen.getByText('Sign Up For Newsletter')).toBeInTheDocument();
    expect(screen.getByText('Get Email updates about our latest shop and')).toBeInTheDocument();
    expect(screen.getByText('special offers')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your email address')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});

// Helper function to run all tests
function runAllTests() {
  const testResults: { [key: string]: boolean } = {};

  Object.keys(global).forEach((key) => {
    if (key.startsWith('test')) {
      try {
        (global as any)[key]();
        testResults[key] = true;
      } catch (error) {
        testResults[key] = false;
        console.error(`Test "${key}" failed:`, error);
      }
    }
  });

  console.log('Test Results:', testResults);
}

runAllTests();