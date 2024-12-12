import { JSDOM } from 'jsdom';

// Create a mock DOM environment
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
  <div id="bar">Open</div>
  <div id="close">Close</div>
  <nav id="navbar"></nav>
</body>
</html>
`);

// Set up the global document object
global.document = dom.window.document;

// Implementation code
const bar: HTMLElement | null = document.getElementById('bar');
const close: HTMLElement | null = document.getElementById('close');
const nav: HTMLElement | null = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', (): void => {
        if (nav) {
            nav.classList.add('active');
        }
    });
}

if (close) {
    close.addEventListener('click', (): void => {
        if (nav) {
            nav.classList.remove('active');
        }
    });
}

// Test suite
describe('Navbar Functionality', () => {
    beforeEach(() => {
        // Reset the navbar classes before each test
        if (nav) {
            nav.className = '';
        }
    });

    test('bar element exists', () => {
        expect(bar).not.toBeNull();
    });

    test('close element exists', () => {
        expect(close).not.toBeNull();
    });

    test('nav element exists', () => {
        expect(nav).not.toBeNull();
    });

    test('clicking bar adds active class to navbar', () => {
        if (bar) {
            bar.click();
        }
        expect(nav?.classList.contains('active')).toBe(true);
    });

    test('clicking close removes active class from navbar', () => {
        if (nav) {
            nav.classList.add('active');
        }
        if (close) {
            close.click();
        }
        expect(nav?.classList.contains('active')).toBe(false);
    });

    test('clicking bar multiple times does not add multiple active classes', () => {
        if (bar) {
            bar.click();
            bar.click();
            bar.click();
        }
        expect(nav?.classList.contains('active')).toBe(true);
        expect(nav?.classList.length).toBe(1);
    });

    test('clicking close when navbar is not active does nothing', () => {
        if (close) {
            close.click();
        }
        expect(nav?.classList.contains('active')).toBe(false);
        expect(nav?.classList.length).toBe(0);
    });
});

// If running this file directly, execute the tests
if (require.main === module) {
    const jest = require('jest');
    jest.run();
}