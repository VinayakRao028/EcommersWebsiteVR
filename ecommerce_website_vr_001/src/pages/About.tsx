import React from 'react';

// Interface for the component's props (if any)
interface AboutProps {
  // Add any props here if needed
}

// Functional component using TypeScript
const About: React.FC<AboutProps> = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p>
        Welcome to our ecommerce website! We are dedicated to providing the best
        shopping experience for our customers.
      </p>
      <section>
        <h2>Our Mission</h2>
        <p>
          Our mission is to offer high-quality products at competitive prices
          while ensuring excellent customer service.
        </p>
      </section>
      <section>
        <h2>Our Team</h2>
        <p>
          We have a passionate team of professionals working hard to make your
          shopping experience seamless and enjoyable.
        </p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns, please don't hesitate to reach
          out to our customer support team.
        </p>
        <p>Email: support@example.com</p>
        <p>Phone: (123) 456-7890</p>
      </section>
    </div>
  );
};

export default About;