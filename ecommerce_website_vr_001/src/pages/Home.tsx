import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { useProducts } from '../hooks/useProducts';

const Home: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="home">
      <h1>Welcome to Our E-commerce Store</h1>
      <p>Discover our amazing products!</p>
      <ProductList products={products} />
      <Link to="/cart" className="view-cart-button">View Cart</Link>
    </div>
  );
};

export default Home;