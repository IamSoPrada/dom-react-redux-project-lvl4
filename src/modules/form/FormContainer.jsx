import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import formImage from '../../../assets/form.png';

const LoginFormFooter = () => {
  const { t } = useTranslation();
  return (
    <>
      <span>
        {t('login.noAccount')}
        {' '}
      </span>
      <Link to="/signup">{t('login.signup')}</Link>
    </>
  );
};

const SignUpFormFooter = () => {
  const { t } = useTranslation();
  return (
    <>
      <span>
        {t('signup.gotAnAccount')}
        {' '}
      </span>
      <Link to="/login">{t('signup.login')}</Link>
    </>
  );
};

const FormContainer = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
              <img
                className="rounded-circle"
                alt="login"
                src={formImage}
              />
            </div>
            {children}
          </div>
          <div className="card-footer p-4">
            <div className="text-center">
              {pathname === '/signup' ? <SignUpFormFooter /> : <LoginFormFooter />}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};
export default FormContainer;
