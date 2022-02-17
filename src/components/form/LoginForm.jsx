/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import createValidationSchema from './formValidationSchema.js';
import AuthContext from '../../contexts/authContext.jsx';
import routes from '../../routes.js';

const LoginForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { isAuthenticated, setCredentials } = useContext(AuthContext);

  const location = useLocation();
  const formSchema = createValidationSchema(t, 'login');

  const handleFormSubmit = async (values, { setErrors }) => {
    try {
      const response = await axios.post(routes.loginPath(), values);
      const { data } = response;
      setCredentials(data);
      toast.success(t('common.success'));
    } catch ({ response }) {
      const { data } = response;
      switch (data.statusCode) {
        case 401:
          setErrors({ username: t('forms.errors.login') });
          toast.error(t('forms.errors.login'));
          break;
        case 500:
          toast.error(t('errors.network'));
          break;
        default:
          toast.error(t('forms.errors.login'));
          toast.error(t('common.error'));
      }
    }
  };

  useEffect(() => inputRef.current?.focus(), []);

  if (isAuthenticated) return <Navigate to="/" state={{ from: location }} />;
  console.log(location);
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={formSchema}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        handleFormSubmit(values, { setErrors });
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h1 className="text-center mb-4">{t('login.header')}</h1>
          <div className="form-floating mb-2 form-group">
            <Field
              aria-label={t('forms.login.label')}
              id="username"
              className="form-control"
              name="username"
              innerRef={inputRef}
              placeholder={t('forms.login.placeholder')}
            />
          </div>

          {touched.username && errors.username && (
          <div className="mb-2 text-danger">{errors.username}</div>
          )}
          <div className="form-floating mb-2 form-group">
            <Field
              aria-label={t('forms.password.label')}
              id="password"
              className="form-control"
              name="password"
              placeholder={t('forms.password.placeholder')}
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
