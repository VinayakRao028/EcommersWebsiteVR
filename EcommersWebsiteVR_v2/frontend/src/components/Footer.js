import React from 'react';
import logo from '../images/logo.png';
import appStore from '../images/pay/app.jpg';
import googlePlay from '../images/pay/play.jpg';
import paymentMethods from '../images/pay/pay.png';

const Footer = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src={logo} alt="Company Logo" />
        <h4>Contact</h4>
        <p><strong>Address:</strong> 562 Wellington Road, Street 32, San Francisco</p>
        <p><strong>Phone:</strong> +1 234-567-8901 / +1 987-654-3210</p>
        <p><strong>Hours:</strong> 10:00 - 18:00, Mon - Sat</p>
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

      <div className="col">
        <h4>About</h4>
        <a href="#">About Us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">My Wishlist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>

      <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src={appStore} alt="App Store" />
          <img src={googlePlay} alt="Google Play" />
        </div>
        <p>Secure Payment Gateways</p>
        <img src={paymentMethods} alt="Payment Methods" />
      </div>

      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Tech - HTML CSS Ecommerce Template</p>
      </div>
    </footer>
  );
};

export default Footer;