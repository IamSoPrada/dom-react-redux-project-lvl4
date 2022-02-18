import React from 'react';
import { useTranslation } from 'react-i18next';
import { Field } from 'formik';

const InputField = ({ type }) => {
  const { t } = useTranslation();
  return (
    <Field
      aria-label={t(`forms.${type}.label`)}
      className="form-control"
      name={type}
      placeholder={t(`forms.${type}.placeholder`)}
    />
  );
};

export default InputField;
