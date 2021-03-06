/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ButtonForm from '../common/components/Button.jsx';
import Title from '../common/components/Title.jsx';
import InputField from '../common/components/InputField.jsx';
import ErrorMessageContainer from '../common/components/ErrorMessageContainer.jsx';
import InputFieldWrapper from '../common/components/InputFieldWrapper.jsx';
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
          <Title>{t('login.header')}</Title>
          <InputFieldWrapper>
            <Field
              aria-label={t('forms.login.label')}
              id="username"
              className="form-control"
              name="username"
              innerRef={inputRef}
              placeholder={t('forms.login.placeholder')}
            />
          </InputFieldWrapper>

          {touched.username && errors.username && (
          <ErrorMessageContainer>{errors.username}</ErrorMessageContainer>
          )}
          <InputFieldWrapper>
            <InputField
              type="password"
            />
          </InputFieldWrapper>

          {touched.password && errors.password && (
          <ErrorMessageContainer>{errors.password}</ErrorMessageContainer>
          )}
          <ButtonForm
            type="primary"
            disabled={isSubmitting}
          >
            {t('login.button')}
          </ButtonForm>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
