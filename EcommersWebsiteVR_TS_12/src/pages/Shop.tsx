import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const Shop: React.FC = () => {
    const products = [
        { id: 1, image: 'images/products/f1.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
        { id: 2, image: 'images/products/f2.jpg', brand: 'adidas', name: 'Cartoon Astronaut T-shirt', price: 78 },
        // ... Add more products here
    ];

    return (
        <div>
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
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fas fa-star"></i>
                                    ))}
                                </div>
                                <h4>${product.price}</h4>
                            </div>
                            <Link to="#"><i className="fal fa-shopping-cart cart"></i></Link>
                        </div>
                    ))}
                </div>
            </section>

            <section id="pagination" className="section-p1">
                <Link to="#">1</Link>
                <Link to="#">2</Link>
                <Link to="#"><i className="fal fa-long-arrow-alt-right"></i></Link>
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
        </div>
    );
};

export default Shop;