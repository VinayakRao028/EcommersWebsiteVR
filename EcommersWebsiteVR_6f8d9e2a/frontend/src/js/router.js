// router.js

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