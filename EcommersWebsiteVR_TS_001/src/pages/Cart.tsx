import React from 'react';
import '../styles/style.css';

interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const cartItems: CartItem[] = [
    { id: 1, image: 'images/products/f1.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
    { id: 2, image: 'images/products/f2.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
    { id: 3, image: 'images/products/f3.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
  ];

  const calculateSubtotal = (price: number, quantity: number): number => {
    return price * quantity;
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, item) => total + calculateSubtotal(item.price, item.quantity), 0);
  };

  return (
    <>
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
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td><a href="#"><i className="far fa-times-circle"></i></a></td>
                <td><img src={item.image} alt={item.name} /></td>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td><input type="number" value={item.quantity} min="1" /></td>
                <td>${calculateSubtotal(item.price, item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="cart-add" className="section-p1">
        <div id="coupon">
          <h3>Apply Coupon</h3>
          <input type="text" placeholder="Enter your coupon" />
          <button className="normal">Apply</button>
        </div>
        <div id="subtotal">
          <h3>Cart Totals</h3>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td>${calculateTotal().toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping</td>
              <td>Free</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>${calculateTotal().toFixed(2)}</strong></td>
            </tr>
          </table>
          <button className="normal">Proceed to Checkout</button>
        </div>
      </section>
    </>
  );
};

export default Cart;