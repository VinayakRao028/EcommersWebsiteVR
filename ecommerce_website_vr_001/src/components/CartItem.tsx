import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';
import { CartItem as CartItemType } from '../types/CartItem';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    dispatch(updateQuantity(item.id, newQuantity));
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Price: ${item.price.toFixed(2)}</p>
        <select 
          value={item.quantity} 
          onChange={handleQuantityChange}
          aria-label={`Quantity for ${item.name}`}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <button onClick={handleRemoveFromCart} aria-label={`Remove ${item.name} from cart`}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;