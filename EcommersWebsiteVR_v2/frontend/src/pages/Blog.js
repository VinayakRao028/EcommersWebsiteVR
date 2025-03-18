import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      image: 'images/blog/b1.jpg',
      title: 'The cotton-Jersey Zip-Up Hoodies',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
      date: '13/01'
    },
    {
      id: 2,
      image: 'images/blog/b2.jpg',
      title: 'The cotton-Jersey Zip-Up Hoodies',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
      date: '13/01'
    },
    {
      id: 3,
      image: 'images/blog/b3.jpg',
      title: 'How to style a Quiff',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
      date: '20/08'
    },
    {
      id: 4,
      image: 'images/blog/b4.jpg',
      title: 'Must-Have skater girl items',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
      date: '15/10'
    },
    {
      id: 5,
      image: 'images/blog/b5.jpg',
      title: 'Runway inspired trends',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
      date: '16/01'
    },
    {
      id: 6,
      image: 'images/blog/b6.jpg',
      title: 'AW20 Menswear Trends',
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi libero accusamus fuga alias repellendus voluptatibus, velit odio repellat explicabo voluptatum.',
      date: '10/03'
    }
  ];

  return (
    <>
      <Header />
      <section id="page-header" className="blog-header">
        <h2>#readmore</h2>
        <p>Read all case studies about our products</p>
      </section>

      <section id="blog">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-box">
            <div className="blog-img">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-details">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
              <Link to={`/blog/${post.id}`}>CONTINUE READING</Link>
            </div>
            <h1>{post.date}</h1>
          </div>
        ))}
      </section>

      <section id="pagination" className="section-p1">
        <Link to="/blog?page=1">1</Link>
        <Link to="/blog?page=2">2</Link>
        <Link to="/blog?page=2"><i className="fal fa-long-arrow-alt-right"></i></Link>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Blog;