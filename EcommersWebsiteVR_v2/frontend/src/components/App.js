import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './MainSectionComponents/Header';
import Main from './Main';
import Footer from './MainSectionComponents/Footer';
import Signin from './Singnin';
import Signup from './Signup';
import Alert from './Alert';
import BusinessForm from './BusinessForm';
import ContactForm from './ContactForm';
import CreatorForm from './CreatorForm';
import BusinessDetails from './BusinessDetails';
import CreatorDetails from './CreatorDetails';
import About from './About';
import CompanyListings from './CompanyListings';

const App = () => {
  const [alert, setAlert] = useState(null);

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
      <div className="flex flex-col min-h-dvh bg-background text-foreground">
        <Header />
        <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/CreatorshipsV2" element={<Main />} />
          <Route path="/signin" element={<Signin showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/submit-business" element={<BusinessForm showAlert={showAlert} />} />
          <Route path="/submit-creator" element={<CreatorForm showAlert={showAlert} />} />
          <Route path="/contact" element={<ContactForm showAlert={showAlert} />} />
          <Route path="/businesses" element={<BusinessDetails showAlert={showAlert} />} />
          <Route path="/creators" element={<CreatorDetails showAlert={showAlert} />} />
          <Route path="/about" element={<About showAlert={showAlert} />} />
          <Route path="/other-businesses" element={<CompanyListings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;