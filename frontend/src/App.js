
import './App.css';
import Header from './components/layout/Header/Header.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import React, { useState,useEffect } from 'react';
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
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UdpateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { user, isAuthenticated } = useSelector(state => state.user);

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka']
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey();
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
          <Route exact path="/password/update" element={<ProtectedRoute Component={UpdatePassword} />} />
          <Route exact path="/password/forgot" element={<ForgotPassword />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login/shipping" element={<ProtectedRoute Component={Shipping} />} />
         
          
          {stripeApiKey && (
            <Route exact path="/process/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute Component={Payment} /></Elements>} />
          )}

          <Route exact path="/success" element={<ProtectedRoute Component={OrderSuccess} />} />
          <Route exact path="/orders" element={<ProtectedRoute Component={MyOrders} />} />
          
          <Route exact path="/order/:id" element={<ProtectedRoute Component={OrderDetails} />} />
          <Route exact path="/order/confirm" element={<ProtectedRoute Component={ConfirmOrder} />} />
          <Route exact path="/admin/dashboard" isAdmin={true} element={<ProtectedRoute Component={Dashboard} />} />
          <Route exact path="/admin/products" isAdmin={true} element={<ProtectedRoute Component={ProductList} />} />
          <Route exact path="/admin/product/new" isAdmin={true} element={<ProtectedRoute Component={NewProduct} />} />
          <Route exact path="/admin/product/:id" isAdmin={true} element={<ProtectedRoute Component={UpdateProduct} />} />
          <Route exact path="/admin/orders" isAdmin={true} element={<ProtectedRoute Component={OrderList} />} />
          <Route exact path="/admin/order/:id" isAdmin={true} element={<ProtectedRoute Component={ProcessOrder} />} />
          <Route exact path="/admin/users"  isAdmin={true} element={<ProtectedRoute Component={UsersList} />} />
          <Route exact path="/admin/user/:id" isAdmin={true} element={<ProtectedRoute Component={UpdateUser} />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
