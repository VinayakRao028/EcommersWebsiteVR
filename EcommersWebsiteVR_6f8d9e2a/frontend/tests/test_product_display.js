// navigation.test.js

// Mock DOM elements
const mockBar = { addEventListener: jest.fn() };
const mockClose = { addEventListener: jest.fn() };
const mockNav = { classList: { add: jest.fn(), remove: jest.fn() } };

// Mock document object
const mockDocument = {
  addEventListener: jest.fn(),
  getElementById: jest.fn((id) => {
    switch (id) {
      case 'bar':
        return mockBar;
      case 'close':
        return mockClose;
      case 'navbar':
        return mockNav;
      default:
        return null;
    }
  }),
};

// Replace global document with mock
global.document = mockDocument;

// Import the functions to test
const navigationCode = `
document.addEventListener('DOMContentLoaded', () => {
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
});
`;

// Execute the navigation code
eval(navigationCode);

describe('Navigation Functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('DOMContentLoaded event listener is added', () => {
    expect(mockDocument.addEventListener).toHaveBeenCalledWith('DOMContentLoaded', expect.any(Function));
  });

  test('Click event listener is added to bar element', () => {
    const domContentLoadedHandler = mockDocument.addEventListener.mock.calls[0][1];
    domContentLoadedHandler();
    expect(mockBar.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
  });

  test('Click event listener is added to close element', () => {
    const domContentLoadedHandler = mockDocument.addEventListener.mock.calls[0][1];
    domContentLoadedHandler();
    expect(mockClose.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
  });

  test('Clicking bar adds active class to nav', () => {
    const domContentLoadedHandler = mockDocument.addEventListener.mock.calls[0][1];
    domContentLoadedHandler();
    const barClickHandler = mockBar.addEventListener.mock.calls[0][1];
    barClickHandler();
    expect(mockNav.classList.add).toHaveBeenCalledWith('active');
  });

  test('Clicking close removes active class from nav', () => {
    const domContentLoadedHandler = mockDocument.addEventListener.mock.calls[0][1];
    domContentLoadedHandler();
    const closeClickHandler = mockClose.addEventListener.mock.calls[0][1];
    closeClickHandler();
    expect(mockNav.classList.remove).toHaveBeenCalledWith('active');
  });

  test('No error when bar element is not found', () => {
    mockDocument.getElementById.mockImplementationOnce(() => null);
    const domContentLoadedHandler = mockDocument.addEventListener.mock.calls[0][1];
    expect(() => domContentLoadedHandler()).not.toThrow();
  });

  test('No error when close element is not found', () => {
    mockDocument.getElementById.mockImplementationOnce((id) => (id === 'close' ? null : mockClose));
    const domContentLoadedHandler = mockDocument.addEventListener.mock.calls[0][1];
    expect(() => domContentLoadedHandler()).not.toThrow();
  });
});

// router.test.js

// Mock React and react-router-dom
const React = {
  createElement: jest.fn(),
};

const ReactRouterDom = {
  BrowserRouter: jest.fn(({ children }) => children),
  Route: jest.fn(),
  Switch: jest.fn(({ children }) => children),
};

// Mock components
const mockComponents = {
  Navigation: jest.fn(() => 'Navigation'),
  Home: jest.fn(() => 'Home'),
  Shop: jest.fn(() => 'Shop'),
  Blog: jest.fn(() => 'Blog'),
  About: jest.fn(() => 'About'),
  Contact: jest.fn(() => 'Contact'),
  Cart: jest.fn(() => 'Cart'),
};

// Router code
const routerCode = `
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import Home from '../components/Home';
import Shop from '../components/Shop';
import Blog from '../components/Blog';
import About from '../components/About';
import Contact from '../components/Contact';
import Cart from '../components/Cart';

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/blog" component={Blog} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
`;

// Mock imports
jest.mock('react', () => React);
jest.mock('react-router-dom', () => ReactRouterDom);
jest.mock('./Navigation', () => mockComponents.Navigation);
jest.mock('../components/Home', () => mockComponents.Home);
jest.mock('../components/Shop', () => mockComponents.Shop);
jest.mock('../components/Blog', () => mockComponents.Blog);
jest.mock('../components/About', () => mockComponents.About);
jest.mock('../components/Contact', () => mockComponents.Contact);
jest.mock('../components/Cart', () => mockComponents.Cart);

// Execute router code
const AppRouter = eval(routerCode);

describe('AppRouter', () => {
  it('renders Router component', () => {
    AppRouter();
    expect(ReactRouterDom.BrowserRouter).toHaveBeenCalled();
  });

  it('renders Navigation component', () => {
    AppRouter();
    expect(React.createElement).toHaveBeenCalledWith(mockComponents.Navigation, null);
  });

  it('renders Switch component', () => {
    AppRouter();
    expect(ReactRouterDom.Switch).toHaveBeenCalled();
  });

  it('renders correct routes', () => {
    AppRouter();
    expect(ReactRouterDom.Route).toHaveBeenCalledWith(
      expect.objectContaining({ exact: true, path: '/', component: mockComponents.Home }),
      null
    );
    expect(ReactRouterDom.Route).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/shop', component: mockComponents.Shop }),
      null
    );
    expect(ReactRouterDom.Route).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/blog', component: mockComponents.Blog }),
      null
    );
    expect(ReactRouterDom.Route).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/about', component: mockComponents.About }),
      null
    );
    expect(ReactRouterDom.Route).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/contact', component: mockComponents.Contact }),
      null
    );
    expect(ReactRouterDom.Route).toHaveBeenCalledWith(
      expect.objectContaining({ path: '/cart', component: mockComponents.Cart }),
      null
    );
  });
});