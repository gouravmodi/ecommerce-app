import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store';
import Signup from './components/Signup';
import Otp from './components/Otp';
import Password from './components/Password';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import CartPage from './components/CartPage';
import Layout from './components/Layout';
import './App.css'; // Import the CSS file

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/password" element={<Password />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Layout>
                <Products />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <PrivateRoute>
              <Layout>
                <ProductDetail />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Layout>
                <CartPage />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </Provider>
);

export default App;
