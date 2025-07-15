import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Importing component modules
import Header from './components/MainSectionComponents/Header';
import Main from './components/Main';
import Footer from './components/MainSectionComponents/Footer';
import Signin from './components/Singnin';
import Signup from './components/Signup';
import Alert from './components/Alert';
import BusinessForm from './components/BusinessForm';
import ContactForm from './components/ContactForm';
import CreatorForm from './components/CreatorForm';
import BusinessDetails from './components/BusinessDetails';
import CreatorDetails from './components/CreatorDetails';
import About from './components/About';
import CompanyListings from './components/CompanyListings';

function App() {

  // State to manage the alert message and type
  const [alert, setAlert] = useState(null);

  // Function to show alert and auto-dismiss after 1.5 seconds
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <Router>
      {/* Overall layout wrapper */}
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        
        {/* Header section */}
        <Header />

        {/* Global alert display */}
        <Alert alert={alert} />

        {/* Route configuration for all pages */}
        <Routes>
          {/* Landing or Main page */}
          <Route path="/" element={<Main />} />

          {/* Alternate entry path to Main */}
          <Route path="/CreatorshipsV2" element={<Main />} />

          {/* Auth routes */}
          <Route path="/signin" element={<Signin showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />

          {/* Form submission routes */}
          <Route path="/submit-business" element={<BusinessForm showAlert={showAlert} />} />
          <Route path="/submit-creator" element={<CreatorForm showAlert={showAlert} />} />
          <Route path="/contact" element={<ContactForm showAlert={showAlert} />} />

          {/* Details views */}
          <Route path="/businesses" element={<BusinessDetails showAlert={showAlert} />} />
          <Route path="/creators" element={<CreatorDetails showAlert={showAlert} />} />

          {/* Informational routes */}
          <Route path="/about" element={<About showAlert={showAlert} />} />
          <Route path="/other-businesses" element={<CompanyListings />} />

          {/* Redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Footer section */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
  
