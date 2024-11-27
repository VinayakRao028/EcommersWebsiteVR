import React from 'react';
import { Link } from 'react-router-dom';

// Define the props interface for the Header component
interface HeaderProps {
  isLoggedIn: boolean;
  username?: string;
}

// Define the Header component as a functional component with TypeScript props
const Header: React.FC<HeaderProps> = ({ isLoggedIn, username }) => {
  return (
    <header className="app-header">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li>Welcome, {username}</li>
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;