import React from 'react';

// About component for the e-commerce website
const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Our E-commerce Store</h1>
      <section>
        <h2>Our Story</h2>
        <p>
          Founded in 2023, our e-commerce store has been dedicated to providing high-quality products
          and exceptional customer service. We started with a simple idea: to make online shopping
          easy, enjoyable, and accessible to everyone.
        </p>
      </section>
      <section>
        <h2>Our Mission</h2>
        <p>
          Our mission is to revolutionize the online shopping experience by offering a wide range of
          products, competitive prices, and a user-friendly platform. We strive to build lasting
          relationships with our customers based on trust, reliability, and satisfaction.
        </p>
      </section>
      <section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>Wide selection of products</li>
          <li>Competitive prices</li>
          <li>Fast and reliable shipping</li>
          <li>Excellent customer support</li>
          <li>Secure payment options</li>
        </ul>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? We'd love to hear from you! Reach out to our customer support
          team at <a href="mailto:support@ecommerce.com">support@ecommerce.com</a> or call us at
          1-800-123-4567.
        </p>
      </section>
    </div>
  );
};

export default About;