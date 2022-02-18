import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './header/Header.jsx';

const Layout = ({ children }) => (

  <div className="d-flex flex-column h-100">
    <Header />
    <Outlet>{children}</Outlet>
    <ToastContainer autoClose={2000} />
  </div>
);
export default Layout;
