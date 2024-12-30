import React from 'react';
import '../styles/style.css';

const Home: React.FC = () => {
  return (
    <>
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button><a href="shop.html">Shop Now</a></button>
      </section>

      <section id="feature" className="section-p1">
        <div className="fe-box">
          <img src="/images/features/f1.png" alt="Free Shipping" />
          <h6>Free Shipping</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f2.png" alt="Online Order" />
          <h6>Online Order</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f3.png" alt="Save Money" />
          <h6>Save Money</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f4.png" alt="Promotions" />
          <h6>Promotions</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f5.png" alt="Happy Sell" />
          <h6>Happy Sell</h6>
        </div>
        <div className="fe-box">
          <img src="/images/features/f6.png" alt="24/7 Support" />
          <h6>24/7 Support</h6>
        </div>
      </section>

      <section id="products1" className="section-p1">    
        <h2>Featured Products</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          {/* Product items */}
          {/* Repeat this structure for each product */}
          <div className="pro">
            <img src="/images/products/f1.jpg" alt="Product" />
            <div className="desc">
              <span>adidas</span>
              <h5>Cartoon Astronaut T-shirt</h5>
              <div className="stat">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star"></i>
                ))}
              </div>
              <h4>$78</h4>
            </div>
            <a href="#"><i className="fal fa-shopping-cart cart"></i></a>
          </div>
          {/* More product items... */}
        </div>
      </section>

      <section id="banner" className="section-m1">
        <h4>Repair service</h4>
        <h2>Up to <span> 70% off </span> All t-shirts & Accessories</h2>
        <button className="normal">Explore More</button>
      </section>

      <section id="products1" className="section-p1">    
        <h2>New Arrivals</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          {/* New arrival product items */}
          {/* Similar structure as Featured Products */}
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
    </>
  );
};

export default Home;