import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

// Mock CSS module
jest.mock('../styles/global.css', () => ({}));

// Component implementation
interface ProductDetails {
  name: string;
  price: number;
  description: string;
}

const Product: React.FC = () => {
  const [mainImage, setMainImage] = React.useState<string>('images/products/f1.jpg');
  const [quantity, setQuantity] = React.useState<number>(1);
  const [size, setSize] = React.useState<string>('');
  const [productDetails] = React.useState<ProductDetails>({
    name: "Men's Fashion T-Shirt",
    price: 139,
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  });

  const handleThumbnailClick = (imageSrc: string) => {
    setMainImage(imageSrc);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${size} ${productDetails.name} to cart`);
  };

  return (
    <div>
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
          <h4>{productDetails.name}</h4>
          <h2>${productDetails.price}</h2>
          <select value={size} onChange={(e) => setSize(e.target.value)} data-testid="size-select">
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
            data-testid="quantity-input"
          />
          <button className="normal" onClick={handleAddToCart} data-testid="add-to-cart-button">
            Add To Cart
          </button>
          <h4>Product Details</h4>
          <span>{productDetails.description}</span>
        </div>
      </section>
    </div>
  );
};

// Test suite
describe('Product Component', () => {
  beforeEach(() => {
    render(<Product />);
  });

  test('renders product details correctly', () => {
    expect(screen.getByText("Men's Fashion T-Shirt")).toBeInTheDocument();
    expect(screen.getByText('$139')).toBeInTheDocument();
    expect(screen.getByText(/Lorem ipsum dolor sit amet/)).toBeInTheDocument();
  });

  test('changes main image when thumbnail is clicked', () => {
    const mainImage = screen.getByAltText('Product') as HTMLImageElement;
    const thumbnail = screen.getByAltText('Thumbnail 2') as HTMLImageElement;

    fireEvent.click(thumbnail);

    expect(mainImage.src).toContain('images/products/f2.jpg');
  });

  test('updates size when selected', () => {
    const sizeSelect = screen.getByTestId('size-select') as HTMLSelectElement;

    fireEvent.change(sizeSelect, { target: { value: 'XL' } });

    expect(sizeSelect.value).toBe('XL');
  });

  test('updates quantity when changed', () => {
    const quantityInput = screen.getByTestId('quantity-input') as HTMLInputElement;

    fireEvent.change(quantityInput, { target: { value: '3' } });

    expect(quantityInput.value).toBe('3');
  });

  test('calls handleAddToCart when Add To Cart button is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const addToCartButton = screen.getByTestId('add-to-cart-button');

    fireEvent.click(addToCartButton);

    expect(consoleSpy).toHaveBeenCalledWith("Added 1  Men's Fashion T-Shirt to cart");
    consoleSpy.mockRestore();
  });
});

// Run the tests
describe('Product Component', () => {
  // ... (previous test cases remain the same)
});