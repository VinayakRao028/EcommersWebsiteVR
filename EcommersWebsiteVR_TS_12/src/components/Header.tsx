import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faTimes, faOutdent } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  // Add any props if needed
}

const Header: React.FC<HeaderProps> = () => {
  const [isNavActive, setIsNavActive] = React.useState<boolean>(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <section id="header">
      <Link to="/">
        <img src="/images/swethlogopng5.png" className="logo" alt="Logo" />
      </Link>

      <div>
        <ul id="navbar" className={isNavActive ? 'active' : ''}>
          <li><Link to="/" className="active">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li id="lg-bag"><Link to="/cart"><FontAwesomeIcon icon={faShoppingBag} /></Link></li>
          <a href="#" id="close" onClick={toggleNav}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
        </ul>
      </div>

      <div id="mobile">
        <Link to="/cart"><FontAwesomeIcon icon={faShoppingBag} /></Link>
        <FontAwesomeIcon id="bar" icon={faOutdent} onClick={toggleNav} />
      </div>
    </section>
  );
};

export default Header;