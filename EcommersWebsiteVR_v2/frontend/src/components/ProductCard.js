import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="pro">
      <img src={product.image} alt={product.name} />
      <div className="desc">
        <span>{product.brand}</span>
        <h5>{product.name}</h5>
        <div className="stat">
          {[...Array(5)].map((_, index) => (
            <i key={index} className="fas fa-star"></i>
          ))}
        </div>
        <h4>${product.price}</h4>
      </div>
      <Link to={`/product/${product.id}`} className="cart-icon">
        <i className="fal fa-shopping-cart"></i>
      </Link>
    </div>
  );
};

export default ProductCard;