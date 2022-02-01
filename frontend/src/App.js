
import './App.css';
import Header from './components/layout/Header/Header.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useEffect } from 'react';
import Footer from './components/layout/Footer/Footer.js';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignUp from './components/User/LoginSignUp';
import Profile from './components/User/Profile';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
function App() {

const { user, isAuthenticated } = useSelector(state => state.user);
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} /> }
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route path="/products/:keyword" element={<Products />} />
          
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignUp />} />
          <Route exact path="/account" element={<ProtectedRoute Component={Profile} />} />
          <Route exact path="/me/update" element={<ProtectedRoute Component={UpdateProfile} />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
