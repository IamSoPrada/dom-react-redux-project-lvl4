/* eslint-disable import/no-unresolved */
import React from 'react';
import SocketContext from '../contexts/socketContext.jsx';

const SocketProvider = (props) => {
  const { children, socket } = props;
  return (
    <SocketContext.Provider value={{
      socket,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
