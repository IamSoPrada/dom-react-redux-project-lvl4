import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SignUpForm from '../components/form/SignUpForm.jsx';
import formImage from '../../assets/form.png';
import Header from '../components/header/Header.jsx';

const RegistrationPage = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column h-100">
      <Header />
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
              <SignUpForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('signup.gotAnAccount')}
                  {' '}
                </span>
                <Link to="/login">{t('signup.login')}</Link>
              </div>
            </div>
          </div>

        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default RegistrationPage;
