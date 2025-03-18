import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const featuredProducts = [
    { id: 1, image: 'images/products/f1.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 2, image: 'images/products/f2.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 3, image: 'images/products/f3.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 4, image: 'images/products/f4.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 5, image: 'images/products/f5.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 6, image: 'images/products/f6.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 7, image: 'images/products/f7.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 8, image: 'images/products/f8.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
  ];

  const newArrivals = [
    { id: 9, image: 'images/products/n1.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 10, image: 'images/products/n2.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 11, image: 'images/products/n3.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 12, image: 'images/products/n4.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 13, image: 'images/products/n5.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 14, image: 'images/products/n6.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 15, image: 'images/products/n7.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
    { id: 16, image: 'images/products/n8.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
  ];

  return (
    <>
      <Header />
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button><Link to="/shop">Shop Now</Link></button>
      </section>

      <section id="feature" className="section-p1">
        {[
          { image: 'images/features/f1.png', text: 'Free Shipping' },
          { image: 'images/features/f2.png', text: 'Online Order' },
          { image: 'images/features/f3.png', text: 'Save Money' },
          { image: 'images/features/f4.png', text: 'Promotions' },
          { image: 'images/features/f5.png', text: 'Happy Sell' },
          { image: 'images/features/f6.png', text: '24/7 Support' },
        ].map((feature, index) => (
          <div key={index} className="fe-box">
            <img src={feature.image} alt="" />
            <h6>{feature.text}</h6>
          </div>
        ))}
      </section>

      <section id="products1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="banner" className="section-m1">
        <h4>Repair service</h4>
        <h2>Up to <span>70% off</span> All t-shirts & Accessories</h2>
        <button className="normal">Explore More</button>
      </section>

      <section id="products1" className="section-p1">
        <h2>New Arrivals</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="sm-banner" className="section-p1">
        <div className="banner-box">
          <h4>Crazy Deals</h4>
          <h2>buy 1 get 1 free</h2>
          <span>The best classic dress is on sale at cara</span>
          <button className="white">Learn More</button>
        </div>
        <div className="banner-box banner-box2">
          <h4>Spring Summer</h4>
          <h2>Upcoming seasons</h2>
          <span>The best classic dress is on sale at cara</span>
          <button className="white">Learn More</button>
        </div>
      </section>

      <section id="banner3">
        <div className="banner-box">
          <h2>SEASONAL SALE</h2>
          <h3>Winter Collection -50% OFF</h3>
        </div>
        <div className="banner-box banner-box2">
          <h2>NEW FOOTWEAR COLLECTION</h2>
          <h3>Spring / Summer 2023</h3>
        </div>
        <div className="banner-box banner-box3">
          <h2>T-SHIRTS</h2>
          <h3>New Trendy Prints</h3>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Home;