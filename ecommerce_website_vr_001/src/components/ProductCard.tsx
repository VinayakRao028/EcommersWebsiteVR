import React from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, onAddToCart }) => {
  // Use a more descriptive name for the click handler
  const handleAddToCartClick = () => {
    onAddToCart(id);
  };

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">${price.toFixed(2)}</p>
      <button onClick={handleAddToCartClick} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;