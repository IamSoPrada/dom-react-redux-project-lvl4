/* eslint-disable import/no-unresolved */
import React, { useContext, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../common/components/Title.jsx';
import ButtonForm from '../common/components/Button.jsx';
import ErrorMessageContainer from '../common/components/ErrorMessageContainer.jsx';
import InputField from '../common/components/InputField.jsx';
import InputFieldWrapper from '../common/components/InputFieldWrapper.jsx';
import FormValidationSchema from './formValidationSchema.js';
import AuthContext from '../../contexts/authContext.jsx';
import routes from '../../routes.js';

const SignUpForm = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { isAuthenticated, setCredentials } = useContext(AuthContext);

  const location = useLocation();
  const formSchema = FormValidationSchema(t, 'signup');

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
      validationSchema={formSchema}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        handleFormSubmit(values, { setErrors });
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Title>{t('signup.header')}</Title>
          <InputFieldWrapper>
            <Field
              aria-label={t('forms.username.label')}
              id="username"
              className="form-control"
              name="username"
              innerRef={inputRef}
              placeholder={t('forms.username.placeholder')}
            />
          </InputFieldWrapper>
          {touched.username && errors.username && (
          <ErrorMessageContainer>
            {errors.username}
          </ErrorMessageContainer>
          )}
          <InputFieldWrapper>
            <InputField
              type="password"
            />
          </InputFieldWrapper>
          {touched.password && errors.password && (
          <ErrorMessageContainer>{errors.password}</ErrorMessageContainer>
          )}
          <InputFieldWrapper>
            <InputField
              type="passwordConfirmation"
            />
          </InputFieldWrapper>
          {touched.passwordConfirmation && errors.passwordConfirmation && (
          <ErrorMessageContainer>{errors.passwordConfirmation}</ErrorMessageContainer>
          )}
          <ButtonForm
            type="primary"
            disabled={isSubmitting}
          >
            {t('signup.button')}
          </ButtonForm>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
