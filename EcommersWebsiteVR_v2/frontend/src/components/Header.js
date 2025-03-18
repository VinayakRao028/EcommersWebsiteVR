import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/swethlogopng5.png';

const Header = () => {
  return (
    <section id="header">
      <Link to="/">
        <img src={logo} className="logo" alt="Logo" />
      </Link>

      <div>
        <ul id="navbar">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li id="lg-bag"><Link to="/cart"><i className="far fa-shopping-bag"></i></Link></li>
          <Link to="#" id="close"><i className="far fa-times"></i></Link>
        </ul>
      </div>
      <div id="mobile">
        <Link to="/cart"><i className="far fa-shopping-bag"></i></Link>
        <i id="bar" className="fas fa-outdent"></i>
      </div>
    </section>
  );
};

export default Header;