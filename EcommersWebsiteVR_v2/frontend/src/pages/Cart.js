import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [coupon, setCoupon] = useState('');

  useEffect(() => {
    // Fetch cart items from local storage or API
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    calculateSubtotal(storedCartItems);
  }, []);

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(total);
  };

  const updateQuantity = (index, newQuantity) => {
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = newQuantity;
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const removeItem = (index) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    calculateSubtotal(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const applyCoupon = () => {
    // Implement coupon logic here
    console.log('Applying coupon:', coupon);
  };

  return (
    <div>
      <Header />
      <section id="page-header" className="about-header">
        <h2>#let's_talk</h2>
        <p>Leave a message, we love to hear from you!</p>
      </section>

      <section id="cart" className="section-p1">
        <table width="100%">
          <thead>
            <tr>
              <td>Remove</td>
              <td>Image</td>
              <td>Product</td>
              <td>Price</td>
              <td>Quantity</td>
              <td>Subtotal</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <a href="#" onClick={() => removeItem(index)}>
                    <i className="far fa-times-circle"></i>
                  </a>
                </td>
                <td><img src={item.image} alt={item.name} /></td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                    min="1"
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="cart-add" className="section-p1">
        <div id="coupon">
          <h3>Apply Coupon</h3>
          <input
            type="text"
            placeholder="Enter your coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="normal" onClick={applyCoupon}>Apply</button>
        </div>
        <div id="subtotal">
          <h3>Cart Totals</h3>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td>${subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>${subtotal.toFixed(2)}</strong></td>
            </tr>
          </table>
          <Link to="/checkout">
            <button className="normal">Proceed to Checkout</button>
          </Link>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Cart;