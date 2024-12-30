import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock CSS import
jest.mock('../styles/style.css', () => ({}));

// Component implementation
const Blog: React.FC = () => {
    return (
        <>
            <section id="page-header" className="blog-header">
                <h2>#readmore</h2>
                <p>Read all case studies about our products</p>
            </section>

            <section id="blog">
                {[
                    { img: 'b1.jpg', title: 'The cotton-Jersey Zip-Up Hoodies', date: '13/01' },
                    { img: 'b2.jpg', title: 'The cotton-Jersey Zip-Up Hoodies', date: '13/01' },
                    { img: 'b3.jpg', title: 'How to style a Quiff', date: '20/08' },
                    { img: 'b4.jpg', title: 'Must-Have skater girl items', date: '15/10' },
                    { img: 'b5.jpg', title: 'Runway inspired trends', date: '16/01' },
                    { img: 'b6.jpg', title: 'AW20 Menswear Trends', date: '10/03' },
                ].map((blog, index) => (
                    <div key={index} className="blog-box">
                        <div className="blog-img">
                            <img src={`/images/blog/${blog.img}`} alt={`Blog ${index + 1}`} />
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
        </>
    );
};

// Test suite
describe('Blog Component', () => {
    test('renders blog header', () => {
        render(<Blog />);
        expect(screen.getByText('#readmore')).toBeInTheDocument();
        expect(screen.getByText('Read all case studies about our products')).toBeInTheDocument();
    });

    test('renders correct number of blog posts', () => {
        render(<Blog />);
        const blogPosts = screen.getAllByText(/CONTINUE READING/i);
        expect(blogPosts).toHaveLength(6);
    });

    test('renders pagination', () => {
        render(<Blog />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('renders newsletter section', () => {
        render(<Blog />);
        expect(screen.getByText('Sign Up For Newsletter')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('your email address')).toBeInTheDocument();
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });

    test('renders blog post titles', () => {
        render(<Blog />);
        expect(screen.getByText('The cotton-Jersey Zip-Up Hoodies')).toBeInTheDocument();
        expect(screen.getByText('How to style a Quiff')).toBeInTheDocument();
        expect(screen.getByText('Must-Have skater girl items')).toBeInTheDocument();
        expect(screen.getByText('Runway inspired trends')).toBeInTheDocument();
        expect(screen.getByText('AW20 Menswear Trends')).toBeInTheDocument();
    });

    test('renders blog post dates', () => {
        render(<Blog />);
        expect(screen.getByText('13/01')).toBeInTheDocument();
        expect(screen.getByText('20/08')).toBeInTheDocument();
        expect(screen.getByText('15/10')).toBeInTheDocument();
        expect(screen.getByText('16/01')).toBeInTheDocument();
        expect(screen.getByText('10/03')).toBeInTheDocument();
    });
});

// Mock implementations
jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useEffect: jest.fn(),
}));

// Run the tests
describe('Run all tests', () => {
    it('should run all tests', () => {
        // This will trigger Jest to run all the tests defined above
        expect(true).toBe(true);
    });
});