import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

const Home: React.FC = () => {
  return (
    <>
      <section id="header">
        <Link to="/">
          <img src="/images/swethlogopng5.png" className="logo" alt="" />
        </Link>

        <div>
          <ul id="navbar">
            <li><Link className="active" to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
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

      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <button><Link to="/shop">Shop Now</Link></button>
      </section>

      <section id="feature" className="section-p1">
        {[
          { img: 'f1.png', text: 'Free Shipping' },
          { img: 'f2.png', text: 'Online Order' },
          { img: 'f3.png', text: 'Save Money' },
          { img: 'f4.png', text: 'Promotions' },
          { img: 'f5.png', text: 'Happy Sell' },
          { img: 'f6.png', text: '24/7 Support' },
        ].map((feature, index) => (
          <div key={index} className="fe-box">
            <img src={`/images/features/${feature.img}`} alt="" />
            <h6>{feature.text}</h6>
          </div>
        ))}
      </section>

      <section id="products1" className="section-p1">    
        <h2>Featured Products</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="pro">
              <img src={`/images/products/f${index + 1}.jpg`} alt="" />
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
          ))}
        </div>
      </section>

      <section id="banner" className="section-m1">
        <h4>Repair service</h4>
        <h2>Up to <span> 70% off </span> All t-shirts & Accessories</h2>
        <button className="normal">Explore More</button>
      </section>

      {/* New Arrivals section */}
      <section id="products1" className="section-p1">    
        <h2>New Arrivals</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="pro">
              <img src={`/images/products/n${index + 1}.jpg`} alt="" />
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

export default Home;