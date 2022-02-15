import { createContext } from 'react';

export default createContext({
  username: '',
  token: '',
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  setToken: () => {},
  setUsername: () => {},
});
