import React from 'react';
import '../styles/style.css';

const Blog: React.FC = () => {
    return (
        <>
            <section id="page-header" className="blog-header">
                <h2>#readmore</h2>
                <p>Read all case studies about our products</p>
            </section>

            <section id="blog">
                <div className="blog-box">
                    <div className="blog-img">
                        <img src="/images/blog/b1.jpg" alt="Blog 1" />
                    </div>
                    <div className="blog-details">
                        <h4>The cotton-Jersey Zip-Up Hoodies</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.</p>
                        <a href="#">CONTINUE READING </a>
                    </div>
                    <h1>13/01</h1>
                </div>
                <div className="blog-box">
                    <div className="blog-img">
                        <img src="/images/blog/b2.jpg" alt="Blog 2" />
                    </div>
                    <div className="blog-details">
                        <h4>The cotton-Jersey Zip-Up Hoodies</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.</p>
                        <a href="#">CONTINUE READING </a>
                    </div>
                    <h1>13/01</h1>
                </div>
                <div className="blog-box">
                    <div className="blog-img">
                        <img src="/images/blog/b3.jpg" alt="Blog 3" />
                    </div>
                    <div className="blog-details">
                        <h4>How to style a Quiff</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.</p>
                        <a href="#">CONTINUE READING </a>
                    </div>
                    <h1>20/08</h1>
                </div>
                <div className="blog-box">
                    <div className="blog-img">
                        <img src="/images/blog/b4.jpg" alt="Blog 4" />
                    </div>
                    <div className="blog-details">
                        <h4>Must-Have skater girl items</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.</p>
                        <a href="#">CONTINUE READING </a>
                    </div>
                    <h1>15/10</h1>
                </div>
                <div className="blog-box">
                    <div className="blog-img">
                        <img src="/images/blog/b5.jpg" alt="Blog 5" />
                    </div>
                    <div className="blog-details">
                        <h4>Runway inspired trends</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.</p>
                        <a href="#">CONTINUE READING </a>
                    </div>
                    <h1>16/01</h1>
                </div>
                <div className="blog-box">
                    <div className="blog-img">
                        <img src="/images/blog/b6.jpg" alt="Blog 6" />
                    </div>
                    <div className="blog-details">
                        <h4>AW20 Menswear Trends</h4>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.</p>
                        <a href="#">CONTINUE READING </a>
                    </div>
                    <h1>10/03</h1>
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
        </>
    );
};

export default Blog;