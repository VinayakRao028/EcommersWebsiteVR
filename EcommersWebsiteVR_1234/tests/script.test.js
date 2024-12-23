// Mock DOM implementation
class MockElement {
  constructor(id) {
    this.id = id;
    this.classList = new Set();
    this.eventListeners = {};
  }

  addEventListener(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);
  }

  click() {
    if (this.eventListeners['click']) {
      this.eventListeners['click'].forEach(callback => callback());
    }
  }
}

// Mock document object
const document = {
  getElementById: (id) => {
    return mockElements[id] || null;
  }
};

// Create mock elements
const mockElements = {
  'bar': new MockElement('bar'),
  'close': new MockElement('close'),
  'navbar': new MockElement('navbar')
};

// Implementation code
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

// Test suite
function describe(description, testFunction) {
  console.log(description);
  testFunction();
}

function it(description, testCase) {
  console.log(`  ${description}`);
  try {
    testCase();
    console.log('    ✓ Test passed');
  } catch (error) {
    console.error('    ✗ Test failed:', error.message);
  }
}

function expect(actual) {
  return {
    toBe: (expected) => {
      if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}`);
      }
    },
    toContain: (expected) => {
      if (!actual.has(expected)) {
        throw new Error(`Expected ${actual} to contain ${expected}`);
      }
    },
    not: {
      toContain: (expected) => {
        if (actual.has(expected)) {
          throw new Error(`Expected ${actual} not to contain ${expected}`);
        }
      }
    }
  };
}

// Run tests
describe('Navigation Menu Functionality', () => {
  it('should add "active" class to navbar when bar is clicked', () => {
    bar.click();
    expect(nav.classList).toContain('active');
  });

  it('should remove "active" class from navbar when close is clicked', () => {
    nav.classList.add('active');
    close.click();
    expect(nav.classList).not.toContain('active');
  });

  it('should not throw error when bar element is missing', () => {
    const originalBar = mockElements.bar;
    delete mockElements.bar;
    expect(() => {
      const bar = document.getElementById('bar');
      if (bar) {
        bar.addEventListener('click', () => {});
      }
    }).not.toThrow();
    mockElements.bar = originalBar;
  });

  it('should not throw error when close element is missing', () => {
    const originalClose = mockElements.close;
    delete mockElements.close;
    expect(() => {
      const close = document.getElementById('close');
      if (close) {
        close.addEventListener('click', () => {});
      }
    }).not.toThrow();
    mockElements.close = originalClose;
  });
});

console.log('All tests completed.');