import * as Yup from 'yup';

const createModalValidationSchema = (channelsNames, t) => Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(2, t('modals.validation.minLength'))
    .max(18, t('modals.validation.maxLength'))
    .required(t('modals.validation.required'))
    .notOneOf([...channelsNames], t('modals.errors.uniqueName')),
});
export default createModalValidationSchema;
