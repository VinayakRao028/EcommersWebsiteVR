import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState('images/products/f1.jpg');
  const [quantity, setQuantity] = useState(1);

  const smallImages = [
    'images/products/f1.jpg',
    'images/products/f2.jpg',
    'images/products/f3.jpg',
    'images/products/f4.jpg'
  ];

  const handleSmallImageClick = (image) => {
    setMainImage(image);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const featuredProducts = [
    {
      id: 1,
      image: 'images/products/f1.jpg',
      brand: 'adidas',
      name: 'Cartoon Astronaut T-shirt',
      rating: 5,
      price: 78
    },
    {
      id: 2,
      image: 'images/products/f2.jpg',
      brand: 'adidas',
      name: 'Cartoon Astronaut T-shirt',
      rating: 5,
      price: 78
    },
    {
      id: 3,
      image: 'images/products/f3.jpg',
      brand: 'adidas',
      name: 'Cartoon Astronaut T-shirt',
      rating: 5,
      price: 78
    },
    {
      id: 4,
      image: 'images/products/f4.jpg',
      brand: 'adidas',
      name: 'Cartoon Astronaut T-shirt',
      rating: 5,
      price: 78
    }
  ];

  return (
    <>
      <Header />
      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <img src={mainImage} width="100%" id="mainimg" alt="" />
          <div className="small-img-group">
            {smallImages.map((image, index) => (
              <div key={index} className="small-img-col">
                <img
                  src={image}
                  width="100%"
                  className="small-img"
                  alt=""
                  onClick={() => handleSmallImageClick(image)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="single-pro-details">
          <h6>Home / T-Shirt</h6>
          <h4>Men's Fashion T-Shirt</h4>
          <h2>$139</h2>
          <select>
            <option>Select Size</option>
            <option>XL</option>
            <option>XXL</option>
            <option>L</option>
            <option>S</option>
          </select>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <button className="normal">Add To Cart</button>
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductDetails;