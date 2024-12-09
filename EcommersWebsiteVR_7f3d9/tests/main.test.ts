const { JSDOM } = require('jsdom');

// Mock the DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Import the main script
const mainScript = require('../src/scripts/main.js');

describe('Navigation Bar Functionality', () => {
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
  });

  test('clicking bar should add active class to navbar', () => {
    bar.click();
    expect(nav.classList.contains('active')).toBe(true);
  });

  test('clicking close should remove active class from navbar', () => {
    nav.classList.add('active');
    close.click();
    expect(nav.classList.contains('active')).toBe(false);
  });
});