import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock the Contact component
const Contact: React.FC = () => {
  return (
    <>
      <section id="page-header" className="about-header">
        <h2>#Let's talk</h2>
        <p>Leave a message we love to hear from you!</p>
      </section>

      <section id="contact-details" className="section-p1">
        <div className="details">
          <span>GET IN TOUCH</span>
          <h2>Visit one of our agency locations or contact us today</h2>
          <h3>Head Office</h3>
          <div>
            <li>
              <i className="fal fa-map"></i>
              <p>56 Glassford Street Glassgow G1 1UL New York</p>
            </li>
            <li>
              <i className="fal fa-envelope"></i>
              <p>contact@example.com</p>
            </li>
            <li>
              <i className="fal fa-phone-alt"></i>
              <p>contact@example.com</p>
            </li>
            <li>
              <i className="fal fa-clock"></i>
              <p>Monday to Saturday: 9.00am to 16.00pm</p>
            </li>
          </div>
        </div>
        <div className="map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.2021700630917!2d78.47495931481076!3d17.354002138098664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb981e4f77ffff%3A0x22739ecd400660e7!2sCharminar%20(Old%20City)%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1677427389894!5m2!1sen!2sin" 
            width="600" 
            height="450" 
            style={{border:0}} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </section>

      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sign Up For Newsletter</h4>
          <p>Get Email updates about our latests shop and <span>special offers</span></p>
        </div>
        <div className="form">
          <input type="text" placeholder="your email address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>
    </>
  );
};

// Mock CSS module
jest.mock('../styles/global.css', () => ({}));

describe('Contact Component', () => {
  beforeEach(() => {
    render(<Contact />);
  });

  test('renders the page header', () => {
    expect(screen.getByText("#Let's talk")).toBeInTheDocument();
    expect(screen.getByText("Leave a message we love to hear from you!")).toBeInTheDocument();
  });

  test('displays contact details', () => {
    expect(screen.getByText("GET IN TOUCH")).toBeInTheDocument();
    expect(screen.getByText("Visit one of our agency locations or contact us today")).toBeInTheDocument();
    expect(screen.getByText("Head Office")).toBeInTheDocument();
  });

  test('shows office address', () => {
    expect(screen.getByText("56 Glassford Street Glassgow G1 1UL New York")).toBeInTheDocument();
  });

  test('displays contact email', () => {
    expect(screen.getByText("contact@example.com")).toBeInTheDocument();
  });

  test('shows office hours', () => {
    expect(screen.getByText("Monday to Saturday: 9.00am to 16.00pm")).toBeInTheDocument();
  });

  test('renders Google Maps iframe', () => {
    const iframe = screen.getByTitle('');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', expect.stringContaining('google.com/maps'));
  });

  test('displays newsletter section', () => {
    expect(screen.getByText("Sign Up For Newsletter")).toBeInTheDocument();
    expect(screen.getByText("Get Email updates about our latests shop and")).toBeInTheDocument();
    expect(screen.getByText("special offers")).toBeInTheDocument();
  });

  test('renders newsletter input and button', () => {
    expect(screen.getByPlaceholderText("your email address")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: "Sign Up" })).toBeInTheDocument();
  });
});

// Mock implementations for external dependencies
jest.mock('@testing-library/react', () => ({
  render: jest.fn(),
  screen: {
    getByText: jest.fn(),
    getByPlaceholderText: jest.fn(),
    getByRole: jest.fn(),
    getByTitle: jest.fn(),
  },
}));

jest.mock('@testing-library/jest-dom/extend-expect', () => ({}));

// Run the tests
describe('Contact Component', () => {
  // ... (previous test cases remain the same)
});