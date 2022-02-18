/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../../contexts/authContext.jsx';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
