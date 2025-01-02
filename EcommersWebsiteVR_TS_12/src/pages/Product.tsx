import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

interface ProductDetails {
  name: string;
  price: number;
  description: string;
}

const Product: React.FC = () => {
  const [mainImage, setMainImage] = useState<string>('images/products/f1.jpg');
  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSize] = useState<string>('');
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "Men's Fashion T-Shirt",
    price: 139,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem repudiandae non laboriosam! Dolor quam voluptas adipisci ab! Quia facilis excepturi ducimus ea in ipsum et sequi harum doloribus eaque recusandae assumenda, ad aperiam molestiae dignissimos eligendi! Temporibus nihil odio pariatur, porro voluptatem quae officiis nam dolorem, consequuntur quo doloribus. Excepturi ad, dolor recusandae rem expedita doloribus minus. Earum, id! Dicta at eveniet rerum quam deleniti vero quo dolore officiis, ipsam iure maxime ad. Distinctio ab impedit quae exercitationem possimus sit vel explicabo eaque? Suscipit iste aperiam error ad saepe exercitationem eius reprehenderit quam ut, hic deserunt adipisci cupiditate ullam quibusdam!"
  });

  useEffect(() => {
    // Fetch product details from API if needed
  }, []);

  const handleThumbnailClick = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${quantity} ${size} ${productDetails.name} to cart`);
  };

  return (
    <div>
      <section id="header">
        {/* Header content */}
      </section>

      <section id="prodetails" className="section-p1">
        <div className="single-pro-image">
          <img src={mainImage} width="100%" id="mainimg" alt="Product" />

          <div className="small-img-group">
            {['f1', 'f2', 'f3', 'f4'].map((img, index) => (
              <div key={index} className="small-img-col">
                <img
                  src={`images/products/${img}.jpg`}
                  width="100%"
                  className="small-img"
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => handleThumbnailClick(`images/products/${img}.jpg`)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="single-pro-details">
          <h6>Home / T-Shirt</h6>
          <h4>{productDetails.name}</h4>
          <h2>${productDetails.price}</h2>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="L">L</option>
            <option value="S">S</option>
          </select>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
          />
          <button className="normal" onClick={handleAddToCart}>Add To Cart</button>
          <h4>Product Details</h4>
          <span>{productDetails.description}</span>
        </div>
      </section>

      <section id="products1" className="section-p1">
        {/* Featured Products section */}
      </section>

      <section id="newsletter" className="section-p1 section-m1">
        {/* Newsletter section */}
      </section>

      <footer className="section-p1">
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Product;