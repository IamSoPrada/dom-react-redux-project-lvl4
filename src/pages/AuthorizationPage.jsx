import React from 'react';
import Header from '../modules/header/Header.jsx';
import FormContainer from '../modules/form/FormContainer.jsx';

const AuthorizationPage = ({ children }) => (
  <div className="d-flex flex-column h-100">
    <Header />
    <FormContainer>
      {children}
    </FormContainer>
  </div>
);

export default AuthorizationPage;
