import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock CSS module
jest.mock('../styles/global.css', () => ({}));

// Component implementation
const Blog: React.FC = () => {
  const blogPosts = [
    {
      img: 'images/blog/b1.jpg',
      title: 'The cotton-Jersey Zip-Up Hoodies',
      date: '13/01'
    },
    {
      img: 'images/blog/b2.jpg',
      title: 'The cotton-Jersey Zip-Up Hoodies',
      date: '13/01'
    },
    {
      img: 'images/blog/b3.jpg',
      title: 'How to style a Quiff',
      date: '20/08'
    },
    {
      img: 'images/blog/b4.jpg',
      title: 'Must-Have skater girl items',
      date: '15/10'
    },
    {
      img: 'images/blog/b5.jpg',
      title: 'Runway inspired trends',
      date: '16/01'
    },
    {
      img: 'images/blog/b6.jpg',
      title: 'AW20 Menswear Trends',
      date: '10/03'
    }
  ];

  return (
    <div>
      <section id="page-header" className="blog-header">
        <h2>#readmore</h2>
        <p>Read all case studies about our products</p>
      </section>

      <section id="blog">
        {blogPosts.map((blog, index) => (
          <div className="blog-box" key={index}>
            <div className="blog-img">
              <img src={blog.img} alt="" />
            </div>
            <div className="blog-details">
              <h4>{blog.title}</h4>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.</p>
              <a href="#">CONTINUE READING </a>
            </div>
            <h1>{blog.date}</h1>
          </div>
        ))}
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
    </div>
  );
};

// Test suite
describe('Blog Component', () => {
  beforeEach(() => {
    render(<Blog />);
  });

  test('renders the page header', () => {
    expect(screen.getByText('#readmore')).toBeInTheDocument();
    expect(screen.getByText('Read all case studies about our products')).toBeInTheDocument();
  });

  test('renders all blog posts', () => {
    const blogTitles = [
      'The cotton-Jersey Zip-Up Hoodies',
      'How to style a Quiff',
      'Must-Have skater girl items',
      'Runway inspired trends',
      'AW20 Menswear Trends'
    ];

    blogTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test('renders correct number of blog posts', () => {
    const blogBoxes = screen.getAllByClassName('blog-box');
    expect(blogBoxes).toHaveLength(6);
  });

  test('renders pagination section', () => {
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('renders newsletter section', () => {
    expect(screen.getByText('Sign Up For Newsletter')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('your email address')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });
});

// Run the tests
describe('Blog Component', () => {
  // ... (previous test cases remain the same)
});