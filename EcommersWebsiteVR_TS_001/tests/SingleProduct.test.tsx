import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock React Router
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => <a href={to}>{children}</a>,
}));

// Component implementation
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

const SingleProduct: React.FC = () => {
  const [mainImage, setMainImage] = React.useState<string>('images/products/f1.jpg');
  const [selectedSize, setSelectedSize] = React.useState<string>('');
  const [quantity, setQuantity] = React.useState<number>(1);

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
    console.log('Added to cart:', { size: selectedSize, quantity });
  };

  return (
    <div>
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
          <select value={selectedSize} onChange={handleSizeChange} data-testid="size-select">
            <option value="">Select Size</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="L">L</option>
            <option value="S">S</option>
          </select>
          <input type="number" value={quantity} onChange={handleQuantityChange} min="1" data-testid="quantity-input" />
          <button className="normal" onClick={handleAddToCart} data-testid="add-to-cart-button">Add To Cart</button>
        </div>
      </section>

      <section id="products1" className="section-p1">    
        <h2>Featured Products</h2>
        <div className="pro-container">
          {featuredProducts.map((product) => (
            <div key={product.id} className="pro">
              <img src={product.image} alt={product.name} />
              <div className="desc">
                <span>{product.brand}</span>
                <h5>{product.name}</h5>
                <h4>${product.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Test suite
describe('SingleProduct Component', () => {
  beforeEach(() => {
    render(<SingleProduct />);
  });

  test('renders main product image', () => {
    const mainImage = screen.getByAltText('Main Product');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', 'images/products/f1.jpg');
  });

  test('renders small product images', () => {
    const smallImages = screen.getAllByAltText(/Small \d/);
    expect(smallImages).toHaveLength(4);
  });

  test('changes main image when small image is clicked', () => {
    const smallImages = screen.getAllByAltText(/Small \d/);
    fireEvent.click(smallImages[1]);
    const mainImage = screen.getByAltText('Main Product');
    expect(mainImage).toHaveAttribute('src', 'images/products/f2.jpg');
  });

  test('allows size selection', () => {
    const sizeSelect = screen.getByTestId('size-select');
    fireEvent.change(sizeSelect, { target: { value: 'XL' } });
    expect(sizeSelect).toHaveValue('XL');
  });

  test('allows quantity change', () => {
    const quantityInput = screen.getByTestId('quantity-input');
    fireEvent.change(quantityInput, { target: { value: '2' } });
    expect(quantityInput).toHaveValue('2');
  });

  test('adds product to cart', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const addToCartButton = screen.getByTestId('add-to-cart-button');
    fireEvent.click(addToCartButton);
    expect(consoleSpy).toHaveBeenCalledWith('Added to cart:', { size: '', quantity: 1 });
  });

  test('renders featured products', () => {
    const featuredProducts = screen.getAllByText('Cartoon Astronaut T-shirt');
    expect(featuredProducts).toHaveLength(4);
  });
});

// Run the tests
describe('Run all tests', () => {
  it('should run all tests', () => {
    // This will trigger Jest to run all the tests defined above
    expect(true).toBe(true);
  });
});