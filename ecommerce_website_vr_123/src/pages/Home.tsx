import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import ProductList from '../components/ProductList';
import '../styles/Home.css';

const Home: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.items);

  return (
    <div className="home">
      <h1>Welcome to Our VR E-commerce Store</h1>
      <p>Discover the latest in virtual reality technology and experiences.</p>
      
      <section className="featured-products">
        <h2>Featured Products</h2>
        <ProductList products={products.slice(0, 4)} />
        <Link to="/products" className="view-all-button">View All Products</Link>
      </section>
      
      <section className="about-vr">
        <h2>About Virtual Reality</h2>
        <p>Virtual Reality (VR) is a simulated experience that can be similar to or completely different from the real world. Applications of virtual reality include entertainment, education, and business.</p>
      </section>
      
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Wide selection of VR products</li>
          <li>Competitive prices</li>
          <li>Expert customer support</li>
          <li>Fast and reliable shipping</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;