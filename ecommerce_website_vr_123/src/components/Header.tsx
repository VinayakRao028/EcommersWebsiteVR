import React from 'react';
import { Link } from 'react-router-dom';

// Define the props interface for the Header component
interface HeaderProps {
  isLoggedIn: boolean;
  cartItemCount: number;
}

// Header component with TypeScript and React
const Header: React.FC<HeaderProps> = ({ isLoggedIn, cartItemCount }) => {
  return (
    <header className="ecommerce-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">VR E-commerce</Link>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="user-actions">
          {isLoggedIn ? (
            <Link to="/account" className="account-link">My Account</Link>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
          <Link to="/cart" className="cart-link">
            Cart ({cartItemCount})
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;