import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const SingleProduct: React.FC = () => {
  const [mainImage, setMainImage] = useState<string>('images/products/f1.jpg');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const smallImages: string[] = [
    'images/products/f1.jpg',
    'images/products/f2.jpg',
    'images/products/f3.jpg',
    'images/products/f4.jpg'
  ];

  const featuredProducts: Product[] = [
    { id: 1, name: 'Cartoon Astronaut T-shirt', brand: 'adidas', price: 78, image: 'images/products/f1.jpg' },
    { id: 2, name: 'Cartoon Astronaut T-shirt', brand: 'adidas', price: 78, image: 'images/products/f2.jpg' },
    { id: 3, name: 'Cartoon Astronaut T-shirt', brand: 'adidas', price: 78, image: 'images/products/f3.jpg' },
    { id: 4, name: 'Cartoon Astronaut T-shirt', brand: 'adidas', price: 78, image: 'images/products/f4.jpg' },
  ];

  useEffect(() => {
    // Any side effects can be handled here
  }, []);

  const handleSmallImageClick = (image: string) => {
    setMainImage(image);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log('Added to cart:', { size: selectedSize, quantity });
  };

  return (
    <div>
      <section id="header">
        <Link to="/"><img src="images/swethlogopng5.png" className="logo" alt="logo" /></Link>
        <nav>
          <ul id="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop" className="active">Shop</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li id="lg-bag"><Link to="/cart"><i className="far fa-shopping-bag"></i></Link></li>
            <Link to="#" id="close"><i className="far fa-times"></i></Link>
          </ul>
        </nav>
        <div id="mobile">
          <Link to="/cart"><i className="far fa-shopping-bag"></i></Link>
          <i id="bar" className="fas fa-outdent"></i>
        </div>
      </section>

      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <img src={mainImage} width="100%" id="mainimg" alt="Main Product" />
          <div className="small-img-group">
            {smallImages.map((img, index) => (
              <div key={index} className="small-img-col">
                <img 
                  src={img} 
                  width="100%" 
                  className="small-img" 
                  alt={`Small ${index + 1}`} 
                  onClick={() => handleSmallImageClick(img)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="single-pro-details">
          <h6>Home / T-Shirt</h6>
          <h4>Men's Fashion T-Shirt</h4>
          <h2>$139</h2>
          <select value={selectedSize} onChange={handleSizeChange}>
            <option value="">Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="L">L</option>
            <option value="S">S</option>
          </select>
          <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
          <button className="normal" onClick={handleAddToCart}>Add To Cart</button>
          <h4>Product Details</h4>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem repudiandae non laboriosam! Dolor quam voluptas adipisci ab! Quia facilis excepturi ducimus ea in ipsum et sequi harum doloribus eaque recusandae assumenda, ad aperiam molestiae dignissimos eligendi! Temporibus nihil odio pariatur, porro voluptatem quae officiis nam dolorem, consequuntur quo doloribus. Excepturi ad, dolor recusandae rem expedita doloribus minus. Earum, id! Dicta at eveniet rerum quam deleniti vero quo dolore officiis, ipsam iure maxime ad. Distinctio ab impedit quae exercitationem possimus sit vel explicabo eaque? Suscipit iste aperiam error ad saepe exercitationem eius reprehenderit quam ut, hic deserunt adipisci cupiditate ullam quibusdam!
          </span>
        </div>
      </section>

      <section id="products1" className="section-p1">    
        <h2>Featured Products</h2>
        <p>Summer Collections New Modern Design</p>
        <div className="pro-container">
          {featuredProducts.map((product) => (
            <div key={product.id} className="pro">
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

      <section id="newsletter" className="section-p1 section-m1">
        <div className="newstext">
          <h4>Sign Up For Newsletter</h4>
          <p>Get Email updates about our latest shop and <span>special offers</span></p>
        </div>
        <div className="form">
          <input type="text" placeholder="Your email address" />
          <button className="normal">Sign Up</button>
        </div>
      </section>

      <footer className="section-p1">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default SingleProduct;