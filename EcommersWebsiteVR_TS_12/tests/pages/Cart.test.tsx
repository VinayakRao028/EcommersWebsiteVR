import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock external dependencies
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: any }) => <i className={`fa ${icon.iconName}`}></i>,
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faShoppingBag: { iconName: 'fa-shopping-bag' },
  faTimes: { iconName: 'fa-times' },
  faTimesCircle: { iconName: 'fa-times-circle' },
}));

// Mock Header and Footer components
const Header = () => <header data-testid="header">Header</header>;
const Footer = () => <footer data-testid="footer">Footer</footer>;

// Cart component implementation
interface CartItem {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    { id: 1, image: '/images/products/f1.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
    { id: 2, image: '/images/products/f2.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
    { id: 3, image: '/images/products/f3.jpg', name: 'Cartoon Astronaut T-Shirt', price: 118.3, quantity: 1 },
  ]);

  const [coupon, setCoupon] = React.useState<string>('');

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
                    <i className="fa fa-times-circle" />
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
            <tbody>
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
            </tbody>
          </table>
          <button className="normal">Proceed to Checkout</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

// Test suite
describe('Cart Component', () => {
  it('renders cart items correctly', () => {
    render(<Cart />);
    expect(screen.getAllByText('Cartoon Astronaut T-Shirt')).toHaveLength(3);
    expect(screen.getAllByText('$118.30')).toHaveLength(3);
  });

  it('updates quantity when changed', () => {
    render(<Cart />);
    const quantityInputs = screen.getAllByRole('spinbutton');
    fireEvent.change(quantityInputs[0], { target: { value: '2' } });
    expect(quantityInputs[0]).toHaveValue(2);
  });

  it('removes item when remove button is clicked', () => {
    render(<Cart />);
    const removeButtons = screen.getAllByRole('link');
    fireEvent.click(removeButtons[0]);
    expect(screen.getAllByText('Cartoon Astronaut T-Shirt')).toHaveLength(2);
  });

  it('calculates subtotal correctly', () => {
    render(<Cart />);
    expect(screen.getByText('$354.90')).toBeInTheDocument();
  });

  it('applies coupon when button is clicked', () => {
    render(<Cart />);
    const couponInput = screen.getByPlaceholderText('Enter your coupon');
    const applyButton = screen.getByText('Apply');
    fireEvent.change(couponInput, { target: { value: 'DISCOUNT10' } });
    fireEvent.click(applyButton);
    // Add assertions for coupon application if needed
  });

  it('renders header and footer', () => {
    render(<Cart />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});

// Run the tests
describe('Cart Component', () => {
  // ... (previous test cases remain the same)
});