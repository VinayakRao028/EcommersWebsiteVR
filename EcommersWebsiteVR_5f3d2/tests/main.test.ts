const { JSDOM } = require('jsdom');

// Mock the DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Import the main script
const main = require('../src/scripts/main');

describe('Navigation Menu Toggle', () => {
  let bar, close, nav;

  beforeEach(() => {
    // Set up the DOM elements
    document.body.innerHTML = `
      <div id="bar"></div>
      <div id="close"></div>
      <nav id="navbar"></nav>
    `;

    bar = document.getElementById('bar');
    close = document.getElementById('close');
    nav = document.getElementById('navbar');

    // Call the main function to set up event listeners
    main();
  });

  test('clicking bar should add active class to nav', () => {
    bar.click();
    expect(nav.classList.contains('active')).toBe(true);
  });

  test('clicking close should remove active class from nav', () => {
    nav.classList.add('active');
    close.click();
    expect(nav.classList.contains('active')).toBe(false);
  });

  test('clicking bar should not throw error if nav is null', () => {
    nav.remove();
    expect(() => bar.click()).not.toThrow();
  });

  test('clicking close should not throw error if nav is null', () => {
    nav.remove();
    expect(() => close.click()).not.toThrow();
  });
});