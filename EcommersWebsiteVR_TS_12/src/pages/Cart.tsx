import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faTimes, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, image: '/images/products/f1.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
    { id: 2, image: '/images/products/f2.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
    { id: 3, image: '/images/products/f3.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
  ]);

  const [coupon, setCoupon] = useState<string>('');

  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleApplyCoupon = () => {
    // Implement coupon logic here
    console.log('Applying coupon:', coupon);
  };

  return (
    <>
      <Header />
      <section id="page-header" className="about-header">
        <h2>#Let's talk</h2>
        <p>Leave a message we love to hear from you!</p>
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
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>
                  <a href="#" onClick={() => handleRemoveItem(item.id)}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </a>
                </td>
                <td><img src={item.image} alt={item.name} /></td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
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
          <button className="normal" onClick={handleApplyCoupon}>Apply</button>
        </div>
        <div id="subtotal">
          <h3>Cart Totals</h3>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td>${calculateSubtotal().toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>${calculateSubtotal().toFixed(2)}</strong></td>
            </tr>
          </table>
          <button className="normal">Proceed to Checkout</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cart;