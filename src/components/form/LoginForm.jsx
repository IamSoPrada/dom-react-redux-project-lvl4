/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import AuthContext from '../../contexts/authContext.jsx';
import routes from '../../routes.js';

const LoginForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const {
    setIsAuthenticated, isAuthenticated, setToken, setUsername,
  } = useContext(AuthContext);

  const location = useLocation();

  const SignInSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, t('forms.username.validation.minLength'))
      .max(20, t('forms.username.validation.maxLength'))
      .required(t('forms.validation.required')),
    password: Yup.string()
      .min(3, t('forms.password.validation.minLength'))
      .max(20, t('forms.password.validation.maxLength'))
      .required(t('forms.validation.required')),
  });

  const handleFormSubmit = async (values, { setErrors }) => {
    try {
      const response = await axios.post(routes.loginPath(), values);
      const { data } = response;
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      localStorage.setItem('isAuthenticated', true);
      setIsAuthenticated(true);
      setToken(data.token);
      setUsername(data.username);
      toast.success(t('common.success'));
    } catch ({ response }) {
      const { data } = response;
      if (data.statusCode === 401) {
        setErrors({ username: t('forms.errors.login') });
        toast.error(t('common.error'));
      } else {
        // toast.error(t('errors.network'));
        toast.error(t('forms.errors.login'));
      }
    }
  };

  useEffect(() => inputRef.current?.focus(), []);

  if (isAuthenticated) return <Navigate to="/" state={{ from: location }} />;

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={SignInSchema}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        handleFormSubmit(values, { setErrors });
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h1 className="text-center mb-4">{t('login.header')}</h1>
          <div className="form-floating mb-2 form-group">
            <label htmlFor="username">{t('forms.login.label')}</label>
            <Field
              id="username"
              className="form-control"
              name="username"
              innerRef={inputRef}
              // placeholder={t('forms.login.placeholder')}
            />

          </div>

          {touched.username && errors.username && (
          <div className="mb-2 text-danger">{errors.username}</div>
          )}
          <div className="form-floating mb-2 form-group">
            <label className="form-label" htmlFor="password">{t('forms.password.label')}</label>
            <Field
              id="password"
              className="form-control"
              name="password"
              // placeholder={t('forms.password.placeholder')}
            />
          </div>

          {touched.password && errors.password && (
          <div className="mb-2 text-danger">{errors.password}</div>
          )}
          <button
            className="w-100 mb-3 btn btn-outline-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {t('login.button')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;