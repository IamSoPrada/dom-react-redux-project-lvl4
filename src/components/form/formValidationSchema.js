import * as Yup from 'yup';

const createValidationSchema = (t) => Yup.object().shape({
  username: Yup.string()
    .min(3, t('forms.username.validation.minLength'))
    .max(20, t('forms.username.validation.maxLength'))
    .required(t('forms.validation.required')),
  password: Yup.string()
    .min(6, t('forms.password.validation.minLength'))
    .max(50, t('forms.password.validation.maxLength'))
    .required(t('forms.validation.required')),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], t('forms.passwordConfirmation.validation.match')),
});

export default createValidationSchema;
