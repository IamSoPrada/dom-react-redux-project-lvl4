/* eslint-disable import/no-unresolved */
import React, { useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import FormValidationSchema from './formValidationSchema.js';
import AuthContext from '../../contexts/authContext.jsx';
import routes from '../../routes.js';

const SignUpForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { isAuthenticated, setCredentials } = useContext(AuthContext);

  const location = useLocation();
  const formShema = FormValidationSchema(t, 'signup');

  const handleFormSubmit = async (values, { setErrors }) => {
    try {
      const response = await axios.post(routes.signUpPath(), values);
      const { data } = response;
      setCredentials(data);
      toast.success(t('common.success'));
    } catch (error) {
      setErrors({ username: t('forms.errors.duplicateUser') });
      toast.error(t('common.error'));
    }
  };
  useEffect(() => inputRef.current?.focus(), []);

  if (isAuthenticated) return <Navigate to="/" state={{ from: location }} />;

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={formShema}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        handleFormSubmit(values, { setErrors });
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <h1 className="text-center mb-4">{t('signup.header')}</h1>
          <div className="form-floating mb-2 form-group">
            <Field
              aria-label={t('forms.username.label')}
              id="username"
              className="form-control"
              name="username"
              innerRef={inputRef}
              placeholder={t('forms.username.placeholder')}
            />
          </div>
          {touched.username && errors.username && (
          <div className="mb-2 text-danger">
            {errors.username}
          </div>
          )}
          <div className="form-floating mb-2 form-group ">
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
          <div className="form-floating mb-2 form-group">
            <Field
              aria-label={t('forms.passwordConfirmation.label')}
              id="passwordConfirmation"
              className="form-control"
              name="passwordConfirmation"
              placeholder={t('forms.passwordConfirmation.placeholder')}
            />
          </div>
          {touched.passwordConfirmation && errors.passwordConfirmation && (
          <div className="mb-2 text-danger">{errors.passwordConfirmation}</div>
          )}
          <button
            className="w-100 mb-3 btn btn-outline-primary"
            type="submit"
            disabled={isSubmitting}
          >
            {t('signup.button')}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
