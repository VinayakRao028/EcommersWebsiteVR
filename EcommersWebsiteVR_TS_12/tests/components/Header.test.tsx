import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock external dependencies
jest.mock('react-router-dom', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: { icon: any }) => <i className={`fa ${icon.iconName}`}></i>,
}));

jest.mock('@fortawesome/free-solid-svg-icons', () => ({
  faShoppingBag: { iconName: 'fa-shopping-bag' },
  faTimes: { iconName: 'fa-times' },
  faOutdent: { iconName: 'fa-outdent' },
}));

// Component implementation
const Header: React.FC = () => {
  const [isNavActive, setIsNavActive] = React.useState<boolean>(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <section id="header">
      <a href="/">
        <img src="/images/swethlogopng5.png" className="logo" alt="Logo" />
      </a>

      <div>
        <ul id="navbar" className={isNavActive ? 'active' : ''}>
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li id="lg-bag"><a href="/cart"><i className="fa fa-shopping-bag"></i></a></li>
          <a href="#" id="close" onClick={toggleNav}>
            <i className="fa fa-times"></i>
          </a>
        </ul>
      </div>

      <div id="mobile">
        <a href="/cart"><i className="fa fa-shopping-bag"></i></a>
        <i id="bar" className="fa fa-outdent" onClick={toggleNav}></i>
      </div>
    </section>
  );
};

// Test suite
describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('displays all navigation links', () => {
    render(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('toggles navigation menu on mobile icon click', () => {
    render(<Header />);
    const mobileIcon = screen.getByTestId('bar');
    const navbar = screen.getByTestId('navbar');

    expect(navbar).not.toHaveClass('active');
    fireEvent.click(mobileIcon);
    expect(navbar).toHaveClass('active');
    fireEvent.click(mobileIcon);
    expect(navbar).not.toHaveClass('active');
  });

  it('closes navigation menu when close icon is clicked', () => {
    render(<Header />);
    const mobileIcon = screen.getByTestId('bar');
    const closeIcon = screen.getByTestId('close');
    const navbar = screen.getByTestId('navbar');

    fireEvent.click(mobileIcon);
    expect(navbar).toHaveClass('active');
    fireEvent.click(closeIcon);
    expect(navbar).not.toHaveClass('active');
  });

  it('renders shopping bag icon in both desktop and mobile views', () => {
    render(<Header />);
    const desktopBagIcon = screen.getByTestId('lg-bag');
    const mobileBagIcon = screen.getByTestId('mobile-bag');

    expect(desktopBagIcon).toBeInTheDocument();
    expect(mobileBagIcon).toBeInTheDocument();
  });
});

// Add necessary test IDs to the component for easier testing
const HeaderWithTestIds: React.FC = () => {
  const [isNavActive, setIsNavActive] = React.useState<boolean>(false);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <section id="header">
      <a href="/">
        <img src="/images/swethlogopng5.png" className="logo" alt="Logo" />
      </a>

      <div>
        <ul id="navbar" className={isNavActive ? 'active' : ''} data-testid="navbar">
          <li><a href="/" className="active">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li id="lg-bag" data-testid="lg-bag"><a href="/cart"><i className="fa fa-shopping-bag"></i></a></li>
          <a href="#" id="close" onClick={toggleNav} data-testid="close">
            <i className="fa fa-times"></i>
          </a>
        </ul>
      </div>

      <div id="mobile">
        <a href="/cart" data-testid="mobile-bag"><i className="fa fa-shopping-bag"></i></a>
        <i id="bar" className="fa fa-outdent" onClick={toggleNav} data-testid="bar"></i>
      </div>
    </section>
  );
};

// Replace the original Header with HeaderWithTestIds in the tests
jest.mock('./Header', () => ({
  __esModule: true,
  default: HeaderWithTestIds,
}));