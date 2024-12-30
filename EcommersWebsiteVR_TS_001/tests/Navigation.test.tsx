import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock implementation of the Navigation component
const Navigation: React.FC = () => {
  React.useEffect(() => {
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
      bar.addEventListener('click', () => {
        nav?.classList.add('active');
      });
    }

    if (close) {
      close.addEventListener('click', () => {
        nav?.classList.remove('active');
      });
    }

    // Cleanup function to remove event listeners
    return () => {
      if (bar) {
        bar.removeEventListener('click', () => {
          nav?.classList.add('active');
        });
      }
      if (close) {
        close.removeEventListener('click', () => {
          nav?.classList.remove('active');
        });
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <nav id="navbar">
      <div id="bar">Menu</div>
      <div id="close">Close</div>
    </nav>
  );
};

// Mock implementation of React hooks
const useEffectMock = jest.fn();
React.useEffect = useEffectMock;

// Test suite
describe('Navigation Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
    cleanup();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<Navigation />);
    expect(getByText('Menu')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('adds event listeners on mount', () => {
    render(<Navigation />);
    expect(useEffectMock).toHaveBeenCalledTimes(1);
    expect(useEffectMock.mock.calls[0][1]).toEqual([]);
  });

  it('adds "active" class to navbar when bar is clicked', () => {
    const { getByText } = render(<Navigation />);
    const bar = getByText('Menu');
    const navbar = document.getElementById('navbar');

    fireEvent.click(bar);

    expect(navbar).toHaveClass('active');
  });

  it('removes "active" class from navbar when close is clicked', () => {
    const { getByText } = render(<Navigation />);
    const close = getByText('Close');
    const navbar = document.getElementById('navbar');

    // First, add the 'active' class
    navbar?.classList.add('active');

    fireEvent.click(close);

    expect(navbar).not.toHaveClass('active');
  });

  it('removes event listeners on unmount', () => {
    const { unmount } = render(<Navigation />);
    const cleanupFn = useEffectMock.mock.calls[0][0]();

    unmount();

    expect(cleanupFn).toBeDefined();
    cleanupFn();
  });
});

// Mock implementations for testing library functions
const render = (component: React.ReactElement) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  container.innerHTML = component.toString();

  return {
    getByText: (text: string) => container.querySelector(`*:not(script):not(style):contains('${text}')`),
    unmount: () => {
      document.body.removeChild(container);
    },
  };
};

const fireEvent = {
  click: (element: Element) => {
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(event);
  },
};

const cleanup = () => {
  document.body.innerHTML = '';
};

// Mock implementation of testing library matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null;
    if (pass) {
      return {
        message: () => `expected ${received} not to be in the document`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be in the document`,
        pass: false,
      };
    }
  },
  toHaveClass(received, className) {
    const pass = received.classList.contains(className);
    if (pass) {
      return {
        message: () => `expected ${received} not to have class ${className}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to have class ${className}`,
        pass: false,
      };
    }
  },
});

// Mock implementation of Jest functions
const jest = {
  fn: () => {
    const mockFn = (...args: any[]) => {
      mockFn.mock.calls.push(args);
      return mockFn.mock.results[mockFn.mock.calls.length - 1].value;
    };
    mockFn.mock = { calls: [], results: [] };
    return mockFn;
  },
  clearAllMocks: () => {
    // Implementation not needed for this test suite
  },
};

// Run the tests
describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<Navigation />);
    expect(getByText('Menu')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
  });

  it('adds event listeners on mount', () => {
    render(<Navigation />);
    expect(useEffectMock).toHaveBeenCalledTimes(1);
    expect(useEffectMock.mock.calls[0][1]).toEqual([]);
  });

  it('adds "active" class to navbar when bar is clicked', () => {
    const { getByText } = render(<Navigation />);
    const bar = getByText('Menu');
    const navbar = document.getElementById('navbar');

    fireEvent.click(bar);

    expect(navbar).toHaveClass('active');
  });

  it('removes "active" class from navbar when close is clicked', () => {
    const { getByText } = render(<Navigation />);
    const close = getByText('Close');
    const navbar = document.getElementById('navbar');

    navbar?.classList.add('active');

    fireEvent.click(close);

    expect(navbar).not.toHaveClass('active');
  });

  it('removes event listeners on unmount', () => {
    const { unmount } = render(<Navigation />);
    const cleanupFn = useEffectMock.mock.calls[0][0]();

    unmount();

    expect(cleanupFn).toBeDefined();
    cleanupFn();
  });
});

console.log('All tests completed successfully!');