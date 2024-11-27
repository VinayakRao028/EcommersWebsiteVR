import React from 'react';

// Define the interface for the product object
interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

// Define the props interface for the ProductCard component
interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

// ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  // Destructure the product object for easier access
  const { id, name, price, imageUrl, description } = product;

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    onAddToCart(id);
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-description">{description}</p>
      <p className="product-price">${price.toFixed(2)}</p>
      <button onClick={handleAddToCart} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;