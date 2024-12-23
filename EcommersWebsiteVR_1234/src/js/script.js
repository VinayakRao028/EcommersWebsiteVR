// src/js/script.js

// Navigation menu functionality
const bar = document.querySelector('#bar');
const close = document.querySelector('#close');
const nav = document.querySelector('#navbar');

const toggleNav = (action) => {
  if (nav) {
    nav.classList[action]('active');
  } else {
    console.error('Navigation element not found');
  }
};

if (bar) bar.addEventListener('click', () => toggleNav('add'));
if (close) close.addEventListener('click', () => toggleNav('remove'));

document.addEventListener('click', (event) => {
  if (nav && nav.classList.contains('active') && !nav.contains(event.target) && event.target !== bar) {
    toggleNav('remove');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav && nav.classList.contains('active')) {
    toggleNav('remove');
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Product image gallery (for sproduct.html)
const mainImg = document.getElementById('MainImg');
const smallImg = document.getElementsByClassName('small-img');

if (mainImg && smallImg.length > 0) {
  Array.from(smallImg).forEach(img => {
    img.addEventListener('click', function() {
      mainImg.src = this.src;
    });
  });
}

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const addToCart = (productId, name, price, image) => {
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, name, price, image, quantity: 1 });
  }
  updateCart();
};

const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  // Update cart icon or counter
  const cartCounter = document.querySelector('#cart-counter');
  if (cartCounter) {
    cartCounter.textContent = cart.reduce((total, item) => total + item.quantity, 0);
  }
};

// Initialize cart on page load
updateCart();

// Example usage: Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.closest('.product');
    addToCart(
      product.dataset.id,
      product.querySelector('.product-name').textContent,
      parseFloat(product.querySelector('.product-price').textContent),
      product.querySelector('.product-image').src
    );
  });
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { toggleNav, addToCart, updateCart };
}