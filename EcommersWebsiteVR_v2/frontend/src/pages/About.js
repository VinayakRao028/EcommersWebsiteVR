import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const About = () => {
  return (
    <>
      <Header />
      <section id="page-header" className="about-header">
        <h2>#KnowUs</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </section>

      <section id="about-head" className="section-p1">
        <img src="/images/about/a6.jpg" alt="About Us" />
        <div>
          <h2>Who We Are?</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, amet laboriosam dolor sit, incidunt modi nobis facilis veritatis sunt neque consequuntur necessitatibus odio eveniet repellat, illum aliquam? Voluptate sit voluptatem voluptas tempore vero. Fuga laborum tempora odio veniam magnam ipsa!
          </p>
          <abbr title="">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus, sunt?
          </abbr>
          <br /><br />
          <marquee bgcolor="#ccc" loop="-1" scrollamount="5" width="100%">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo voluptatibus adipisci amet et? Distinctio, exercitationem!
          </marquee>
        </div>
      </section>

      <section id="about-app" className="section-p1">
        <h1>Download Our <Link to="#">APP</Link></h1>
        <div className="video">
          <video autoPlay muted loop src="/images/about/1.mp4"></video>
        </div>
      </section>

      <section id="feature" className="section-p1">
        {[
          { img: 'f1.png', text: 'Free Shipping' },
          { img: 'f2.png', text: 'Online Order' },
          { img: 'f3.png', text: 'Save Money' },
          { img: 'f4.png', text: 'Promotions' },
          { img: 'f5.png', text: 'Happy Sell' },
          { img: 'f6.png', text: '24/7 Support' }
        ].map((feature, index) => (
          <div key={index} className="fe-box">
            <img src={`/images/features/${feature.img}`} alt={feature.text} />
            <h6>{feature.text}</h6>
          </div>
        ))}
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default About;