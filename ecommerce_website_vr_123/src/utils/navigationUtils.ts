// navigationUtils.ts

/**
 * This file contains utility functions for handling navigation-related DOM interactions.
 * It manages the toggling of a navigation menu using 'bar' and 'close' elements.
 */

// Function to toggle the navigation menu
const toggleNavMenu = (action: 'add' | 'remove'): void => {
  const nav = document.getElementById('navbar');
  if (nav) {
    nav.classList[action]('active');
  }
};

// Event listener for opening the navigation menu
const initializeOpenNavListener = (): void => {
  const barElement = document.getElementById('bar');
  if (barElement) {
    barElement.addEventListener('click', () => toggleNavMenu('add'));
  }
};

// Event listener for closing the navigation menu
const initializeCloseNavListener = (): void => {
  const closeElement = document.getElementById('close');
  if (closeElement) {
    closeElement.addEventListener('click', () => toggleNavMenu('remove'));
  }
};

// Initialize all navigation-related event listeners
const initializeNavigationListeners = (): void => {
  initializeOpenNavListener();
  initializeCloseNavListener();
};

// Call the initialization function when the script loads
initializeNavigationListeners();

// Export functions for potential use in other modules
export { toggleNavMenu, initializeNavigationListeners };