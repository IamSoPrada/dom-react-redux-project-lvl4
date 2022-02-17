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
  const setCredentials = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('isAuthenticated', true);
    setIsAuthenticated(true);
    setToken(data.token);
    setUsername(data.username);
  };

  const value = {
    username,
    token,
    isAuthenticated,
    setIsAuthenticated,
    setToken,
    setUsername,
    signOut,
    setCredentials,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
