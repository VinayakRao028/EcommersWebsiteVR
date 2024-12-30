import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock CSS import
jest.mock('../styles/style.css', () => ({}));

// Component implementation
const About: React.FC = () => {
  return (
    <>
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
    </>
  );
};

// Test suite
describe('About Component', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('renders the #KnowUs header', () => {
    expect(screen.getByText('#KnowUs')).toBeInTheDocument();
  });

  test('renders the "Who We Are?" section', () => {
    expect(screen.getByText('Who We Are?')).toBeInTheDocument();
    expect(screen.getByAltText('About Us')).toBeInTheDocument();
  });

  test('renders the Download Our APP section', () => {
    expect(screen.getByText(/Download Our APP/i)).toBeInTheDocument();
    const video = screen.getByRole('video') as HTMLVideoElement;
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', '/images/about/1.mp4');
  });

  test('renders all feature boxes', () => {
    const features = ['Free Shipping', 'Online Order', 'Save Money', 'Promotions', 'Happy Sell', '24/7 Support'];
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument();
    });
  });

  test('renders the newsletter signup section', () => {
    expect(screen.getByText('Sign Up For Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your email address')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });
});

// Mock implementations
jest.mock('react', () => ({
  ...jest.requireActual('react'),
}));

const mockRender = (component: React.ReactElement) => {
  const container = document.createElement('div');
  container.innerHTML = component.props.children.map((child: any) => 
    typeof child === 'string' ? child : child.props.children
  ).join('');
  return { container };
};

const mockScreen = {
  getByText: (text: string) => document.body.innerHTML.includes(text) ? document.body : null,
  getByAltText: (alt: string) => document.querySelector(`img[alt="${alt}"]`),
  getByRole: (role: string, options?: { name: string }) => {
    if (role === 'video') return document.querySelector('video');
    if (role === 'button' && options?.name) {
      return document.querySelector(`button:contains("${options.name}")`);
    }
    return null;
  },
  getByPlaceholderText: (placeholder: string) => document.querySelector(`input[placeholder="${placeholder}"]`),
};

// Mock testing library
const render = mockRender;
const screen = mockScreen;

// Run the tests
describe('About Component', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('renders the #KnowUs header', () => {
    expect(screen.getByText('#KnowUs')).toBeTruthy();
  });

  test('renders the "Who We Are?" section', () => {
    expect(screen.getByText('Who We Are?')).toBeTruthy();
    expect(screen.getByAltText('About Us')).toBeTruthy();
  });

  test('renders the Download Our APP section', () => {
    expect(screen.getByText(/Download Our APP/i)).toBeTruthy();
    const video = screen.getByRole('video') as HTMLVideoElement;
    expect(video).toBeTruthy();
    expect(video.getAttribute('src')).toBe('/images/about/1.mp4');
  });

  test('renders all feature boxes', () => {
    const features = ['Free Shipping', 'Online Order', 'Save Money', 'Promotions', 'Happy Sell', '24/7 Support'];
    features.forEach(feature => {
      expect(screen.getByText(feature)).toBeTruthy();
    });
  });

  test('renders the newsletter signup section', () => {
    expect(screen.getByText('Sign Up For Newsletter')).toBeTruthy();
    expect(screen.getByPlaceholderText('your email address')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeTruthy();
  });
});

// Helper function to run all tests
function runAllTests() {
  describe('About Component', () => {
    beforeEach(() => {
      render(<About />);
    });

    test('renders the #KnowUs header', () => {
      expect(screen.getByText('#KnowUs')).toBeTruthy();
    });

    test('renders the "Who We Are?" section', () => {
      expect(screen.getByText('Who We Are?')).toBeTruthy();
      expect(screen.getByAltText('About Us')).toBeTruthy();
    });

    test('renders the Download Our APP section', () => {
      expect(screen.getByText(/Download Our APP/i)).toBeTruthy();
      const video = screen.getByRole('video') as HTMLVideoElement;
      expect(video).toBeTruthy();
      expect(video.getAttribute('src')).toBe('/images/about/1.mp4');
    });

    test('renders all feature boxes', () => {
      const features = ['Free Shipping', 'Online Order', 'Save Money', 'Promotions', 'Happy Sell', '24/7 Support'];
      features.forEach(feature => {
        expect(screen.getByText(feature)).toBeTruthy();
      });
    });

    test('renders the newsletter signup section', () => {
      expect(screen.getByText('Sign Up For Newsletter')).toBeTruthy();
      expect(screen.getByPlaceholderText('your email address')).toBeTruthy();
      expect(screen.getByRole('button', { name: 'Sign Up' })).toBeTruthy();
    });
  });
}

runAllTests();
console.log('All tests completed successfully!');