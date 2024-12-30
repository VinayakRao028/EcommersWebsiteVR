import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <header>
          <Link to="/">
            <img src="/images/swethlogopng5.png" className="logo" alt="Logo" />
          </Link>
          <nav>
            <ul id="navbar">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li id="lg-bag"><Link to="/cart"><i className="far fa-shopping-bag"></i></Link></li>
              <a href="#" id="close"><i className="far fa-times"></i></a>
            </ul>
          </nav>
          <div id="mobile">
            <Link to="/cart"><i className="far fa-shopping-bag"></i></Link>
            <i id="bar" className="fas fa-outdent"></i>
          </div>
        </header>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/shop" component={Shop} />
          <Route path="/blog" component={Blog} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/cart" component={Cart} />
        </Switch>

        <footer className="section-p1">
          {/* Footer content */}
          <div className="col">
            <img className="logo" src="/images/logo.png" alt="Logo" />
            <h4>Contact</h4>
            <p><strong>Address:</strong> 562 Wellington Road, Street 32, San Francisco</p>
            <p><strong>Phone:</strong> +8 40470289 +7 89048098</p>
            <p><strong>Hours:</strong> 10:00 - 18:00 Mon-Sat</p>
            <div className="follow">
              <h4>Follow Us</h4>
              <div className="icon">
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-instagram"></i>
                <i className="fab fa-pinterest-p"></i>
                <i className="fab fa-youtube"></i>
              </div>
            </div>
          </div>
          {/* Other footer columns */}
          <div className="copyright">
            <p>©Copyright 2021 Tech - HTML CSS Ecommerce Template</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;