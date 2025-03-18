// App.test.js

// Mock React and React Router DOM
const React = {
  useState: jest.fn(),
};

const ReactRouterDOM = {
  BrowserRouter: ({ children }) => children,
  Route: ({ element }) => element,
  Routes: ({ children }) => children,
  Navigate: () => null,
};

// Mock child components
const mockHeader = () => <div data-testid="header">Header</div>;
const mockMain = () => <div data-testid="main">Main</div>;
const mockFooter = () => <div data-testid="footer">Footer</div>;
const mockSignin = () => <div data-testid="signin">Signin</div>;
const mockSignup = () => <div data-testid="signup">Signup</div>;
const mockAlert = () => <div data-testid="alert">Alert</div>;
const mockBusinessForm = () => <div data-testid="business-form">Business Form</div>;
const mockContactForm = () => <div data-testid="contact-form">Contact Form</div>;
const mockCreatorForm = () => <div data-testid="creator-form">Creator Form</div>;
const mockBusinessDetails = () => <div data-testid="business-details">Business Details</div>;
const mockCreatorDetails = () => <div data-testid="creator-details">Creator Details</div>;
const mockAbout = () => <div data-testid="about">About</div>;
const mockCompanyListings = () => <div data-testid="company-listings">Company Listings</div>;

jest.mock('react', () => React);
jest.mock('react-router-dom', () => ReactRouterDOM);
jest.mock('./MainSectionComponents/Header', () => mockHeader);
jest.mock('./Main', () => mockMain);
jest.mock('./MainSectionComponents/Footer', () => mockFooter);
jest.mock('./Singnin', () => mockSignin);
jest.mock('./Signup', () => mockSignup);
jest.mock('./Alert', () => mockAlert);
jest.mock('./BusinessForm', () => mockBusinessForm);
jest.mock('./ContactForm', () => mockContactForm);
jest.mock('./CreatorForm', () => mockCreatorForm);
jest.mock('./BusinessDetails', () => mockBusinessDetails);
jest.mock('./CreatorDetails', () => mockCreatorDetails);
jest.mock('./About', () => mockAbout);
jest.mock('./CompanyListings', () => mockCompanyListings);

// Import the component to be tested
import App from './App';

// Mock timer functions
jest.useFakeTimers();

describe('App Component', () => {
  let useStateMock;

  beforeEach(() => {
    useStateMock = jest.spyOn(React, 'useState');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    useStateMock.mockReturnValue([null, jest.fn()]);
    const { getByTestId } = render(<App />);
    
    expect(getByTestId('header')).toBeInTheDocument();
    expect(getByTestId('footer')).toBeInTheDocument();
  });

  test('shows and hides alert', () => {
    const setAlertMock = jest.fn();
    useStateMock.mockReturnValue([null, setAlertMock]);

    const { getByTestId } = render(<App />);
    
    // Access the showAlert function
    const showAlert = App().props.children[1].props.showAlert;

    // Call showAlert
    showAlert('Test message', 'success');

    // Check if setAlert was called with the correct arguments
    expect(setAlertMock).toHaveBeenCalledWith({
      msg: 'Test message',
      type: 'success'
    });

    // Fast-forward timers
    jest.advanceTimersByTime(1500);

    // Check if setAlert was called to clear the alert
    expect(setAlertMock).toHaveBeenCalledWith(null);
  });

  test('renders correct routes', () => {
    useStateMock.mockReturnValue([null, jest.fn()]);
    const { getByTestId } = render(<App />);

    // Check if main routes are rendered
    expect(getByTestId('main')).toBeInTheDocument();
    expect(getByTestId('signin')).toBeInTheDocument();
    expect(getByTestId('signup')).toBeInTheDocument();
    expect(getByTestId('business-form')).toBeInTheDocument();
    expect(getByTestId('creator-form')).toBeInTheDocument();
    expect(getByTestId('contact-form')).toBeInTheDocument();
    expect(getByTestId('business-details')).toBeInTheDocument();
    expect(getByTestId('creator-details')).toBeInTheDocument();
    expect(getByTestId('about')).toBeInTheDocument();
    expect(getByTestId('company-listings')).toBeInTheDocument();
  });
});

// Helper function to render components
function render(component) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  const ReactDOM = {
    createRoot: (container) => ({
      render: (element) => {
        container.innerHTML = '';
        container.appendChild(element);
      },
    }),
  };
  
  ReactDOM.createRoot(container).render(component);
  
  return {
    getByTestId: (testId) => container.querySelector(`[data-testid="${testId}"]`),
  };
}