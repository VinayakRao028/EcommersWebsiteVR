import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

interface Product {
  id: number;
  image: string;
  brand: string;
  name: string;
  rating: number;
  price: number;
}

const Shop: React.FC = () => {
  const products: Product[] = [
    { id: 1, image: '/images/products/f1.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', rating: 5, price: 78 },
    { id: 2, image: '/images/products/f2.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', rating: 5, price: 78 },
    // ... Add more products here
  ];

  return (
    <>
      <section id="header">
        <Link to="/"><img src="/images/swethlogopng5.png" className="logo" alt="" /></Link>

        <div>
          <ul id="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop" className="active">Shop</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li id="lg-bag"><Link to="/cart"><i className="far fa-shopping-bag"></i></Link></li>
            <a href="#" id="close"><i className="far fa-times"></i></a>
          </ul>
        </div>
        <div id="mobile">
          <Link to="/cart"><i className="far fa-shopping-bag"></i></Link>
          <i id="bar" className="fas fa-outdent"></i>
        </div>
      </section>

      <section id="page-header">
        <h2>#Stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      <section id="products1" className="section-p1">    
        <div className="pro-container">
          {products.map((product) => (
            <div key={product.id} className="pro" onClick={() => window.location.href='/sproduct'}>
              <img src={product.image} alt={product.name} />
              <div className="desc">
                <span>{product.brand}</span>
                <h5>{product.name}</h5>
                <div className="stat">
                  {[...Array(product.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <h4>${product.price}</h4>
              </div>
              <a href="#"><i className="fal fa-shopping-cart cart"></i></a>
            </div>
          ))}
        </div>
      </section>

      <section id="pagination" className="section-p1">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#"><i className="fal fa-long-arrow-alt-right"></i></a>
      </section>

      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sign Up For Newsletter</h4>
          <p>Get Email updates about our latest shop and <span>special offers</span></p>
        </div>
        <div className="form">
          <input type="text" placeholder="your email address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>

      <footer className="section-p1">
        {/* Footer content */}
      </footer>
    </>
  );
};

export default Shop;