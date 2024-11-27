import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

// Define the main App component
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/products" component={ProductList} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;