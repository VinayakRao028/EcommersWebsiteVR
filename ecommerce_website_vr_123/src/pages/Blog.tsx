import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the structure of a blog post
interface BlogPost {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch blog posts
    const fetchBlogPosts = async () => {
      try {
        // TODO: Replace with actual API endpoint
        const response = await axios.get<BlogPost[]>('/api/blog-posts');
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog posts. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <div>Loading blog posts...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="blog-container">
      <h1>Our Blog</h1>
      {posts.map((post) => (
        <article key={post.id} className="blog-post">
          <h2>{post.title}</h2>
          <p className="post-meta">
            By {post.author} on {post.date}
          </p>
          <div className="post-content">{post.content}</div>
        </article>
      ))}
    </div>
  );
};

export default Blog;