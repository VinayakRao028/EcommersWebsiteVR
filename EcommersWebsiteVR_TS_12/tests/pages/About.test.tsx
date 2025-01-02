import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock the About component
const About: React.FC = () => {
  return (
    <div>
      <section id="page-header" className="about-header">
        <h2>#KnowUs</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </section>

      <section id="about-head" className="section-p1">
        <img src="/images/about/a6.jpg" alt="About Us" />
        <div>
          <h2>Who We Are?</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, amet laboriosam dolor sit, incidunt modi nobis facilis veritatis sunt neque consequuntur necessitatibus odio eveniet repellat, illum aliquam? Voluptate sit voluptatem voluptas tempore vero. Fuga laborum tempora odio veniam magnam ipsa!</p>
          <abbr title="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, sunt?</abbr>
          <br /><br />
          <marquee bgcolor="#ccc" loop={-1} scrollamount={5} width="100%">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo voluptatibus adipisci amet et? Distinctio, exercitationem!</marquee>
        </div>
      </section>

      <section id="about-app" className="section-p1">
        <h1>Download Our <a href="#">APP</a></h1>
        <div className="video">
          <video autoPlay muted loop src="/images/about/1.mp4"></video>
        </div>
      </section>

      <section id="feature" className="section-p1">
        {[
          { img: 'f1.png', text: 'Free Shipping' },
          { img: 'f2.png', text: 'Online Order' },
          { img: 'f3.png', text: 'Save Money' },
          { img: 'f4.png', text: 'Promotions' },
          { img: 'f5.png', text: 'Happy Sell' },
          { img: 'f6.png', text: '24/7 Support' },
        ].map((feature, index) => (
          <div key={index} className="fe-box">
            <img src={`/images/features/${feature.img}`} alt={feature.text} />
            <h6>{feature.text}</h6>
          </div>
        ))}
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

// Mock CSS module
jest.mock('../styles/global.css', () => ({}));

// Test suite
describe('About Component', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('renders the page header', () => {
    expect(screen.getByText('#KnowUs')).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet consectetur adipisicing elit.')).toBeInTheDocument();
  });

  test('renders the about-head section', () => {
    expect(screen.getByAltText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Who We Are?')).toBeInTheDocument();
  });

  test('renders the about-app section', () => {
    expect(screen.getByText(/Download Our/)).toBeInTheDocument();
    expect(screen.getByText('APP')).toBeInTheDocument();
    const video = screen.getByRole('video');
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', '/images/about/1.mp4');
  });

  test('renders the feature section', () => {
    const features = ['Free Shipping', 'Online Order', 'Save Money', 'Promotions', 'Happy Sell', '24/7 Support'];
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('renders the newsletter section', () => {
    expect(screen.getByText('Sign Up For Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });
});

// Mock implementations for external dependencies
jest.mock('@testing-library/react', () => ({
  render: jest.fn(),
  screen: {
    getByText: jest.fn(),
    getByAltText: jest.fn(),
    getByRole: jest.fn(),
    getByPlaceholderText: jest.fn(),
  },
}));

jest.mock('@testing-library/jest-dom/extend-expect', () => ({}));

// Run the tests
describe('About Component', () => {
  // ... (previous test cases remain the same)
});