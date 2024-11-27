import React from 'react';
import { Link } from 'react-router-dom';

// Define the FooterProps interface
interface FooterProps {
  companyName: string;
}

// Footer component with TypeScript and React
const Footer: React.FC<FooterProps> = ({ companyName }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are a leading e-commerce platform offering a wide range of products.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/account">My Account</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@{companyName.toLowerCase()}.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} {companyName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;