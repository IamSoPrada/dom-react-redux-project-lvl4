/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import AuthContext from '../contexts/authContext.jsx';

const AuthProvider = (props) => {
  const { children } = props;

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));
  const signOut = () => {
    setIsAuthenticated(null);
    setToken(null);
    setUsername(null);
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{
      username, token, setIsAuthenticated, isAuthenticated, setToken, setUsername, signOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
