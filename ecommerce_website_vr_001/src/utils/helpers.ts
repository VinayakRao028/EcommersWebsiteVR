// helpers.ts

/**
 * This file contains helper functions for manipulating the DOM and handling UI interactions.
 */

/**
 * Adds the 'active' class to the navbar when the bar element is clicked.
 */
export const handleBarClick = (): void => {
  const bar: HTMLElement | null = document.getElementById('bar');
  const nav: HTMLElement | null = document.getElementById('navbar');

  if (bar && nav) {
    bar.addEventListener('click', () => {
      nav.classList.add('active');
    });
  }
};

/**
 * Removes the 'active' class from the navbar when the close element is clicked.
 */
export const handleCloseClick = (): void => {
  const close: HTMLElement | null = document.getElementById('close');
  const nav: HTMLElement | null = document.getElementById('navbar');

  if (close && nav) {
    close.addEventListener('click', () => {
      nav.classList.remove('active');
    });
  }
};

/**
 * Initializes the UI event listeners.
 */
export const initializeUIEventListeners = (): void => {
  handleBarClick();
  handleCloseClick();
};