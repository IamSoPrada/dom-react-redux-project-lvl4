/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/authContext.jsx';

const Header = () => {
  const { t } = useTranslation();
  const {
    signOut,
    isAuthenticated,
  } = useContext(AuthContext);

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">
          {t('header.logo')}
        </Link>
        {isAuthenticated && <button type="button" onClick={signOut} className="btn btn-primary">{t('header.button')}</button>}
      </div>
    </nav>
  );
};

export default Header;
