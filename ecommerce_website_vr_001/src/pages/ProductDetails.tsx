import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../services/productService';
import { addToCart } from '../services/cartService';
import { Product } from '../types/Product';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (id) {
          const productData = await getProductDetails(id);
          setProduct(productData);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
        // TODO: Handle error state (e.g., show error message to user)
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity > 0 ? newQuantity : 1);
  };

  const handleAddToCart = async () => {
    if (product) {
      try {
        await addToCart(product.id, quantity);
        // TODO: Show success message or update cart UI
      } catch (error) {
        console.error('Error adding product to cart:', error);
        // TODO: Show error message to user
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${product.price.toFixed(2)}</p>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;