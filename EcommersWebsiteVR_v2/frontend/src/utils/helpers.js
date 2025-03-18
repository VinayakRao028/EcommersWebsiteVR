// Utility functions for DOM manipulation and event handling

/**
 * Toggles the 'active' class on the navbar element
 * @param {string} action - 'add' to add the class, 'remove' to remove it
 */
export const toggleNavbar = (action) => {
  const navbar = document.getElementById('navbar');
  if (navbar) {
    navbar.classList[action]('active');
  }
};

/**
 * Adds click event listeners to the bar and close elements
 */
export const initializeNavbarToggle = () => {
  const bar = document.getElementById('bar');
  const close = document.getElementById('close');

  if (bar) {
    bar.addEventListener('click', () => toggleNavbar('add'));
  }

  if (close) {
    close.addEventListener('click', () => toggleNavbar('remove'));
  }
};

/**
 * Initializes the navbar toggle functionality
 */
export const setupNavbar = () => {
  document.addEventListener('DOMContentLoaded', initializeNavbarToggle);
};