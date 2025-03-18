import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      <section id="products1" className="section-p1">
        <div className="pro-container">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="pagination" className="section-p1">
        <Link to="#">1</Link>
        <Link to="#">2</Link>
        <Link to="#"><i className="fal fa-long-arrow-alt-right"></i></Link>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Shop;