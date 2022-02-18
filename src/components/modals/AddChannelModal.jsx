/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import filter from 'leo-profanity';
import createModalValidationSchema from './modalValidationSchema.js';
import ErrorMessageContainer from '../common/components/ErrorMessageContainer.jsx';
import InputFieldWrapper from '../common/components/InputFieldWrapper.jsx';
import ButtonForm from '../common/components/Button.jsx';
import CloseButton from './common/components/CloseButton.jsx';
import SocketContext from '../../contexts/socketContext.jsx';
import { handleCloseModal } from './utils.js';
import { socketEmitEvent } from '../../socketApi.js';
import { ADD_CHANNEL } from '../../types.js';

const AddChannelModal = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
  const channelsNames = channels.map(({ name }) => name);
  const AddChannelSchema = createModalValidationSchema(channelsNames, t);
  const handleFormSubmit = (values) => {
    const { name } = values;
    const channel = {
      name: filter.clean(name),
    };
    socketEmitEvent(socket, ADD_CHANNEL, channel);
    handleCloseModal();
  };
  useEffect(() => inputRef.current?.focus(), []);
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={AddChannelSchema}
      onSubmit={(values, { resetForm }) => {
        handleFormSubmit(values);
        resetForm();
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{t('modals.add.header')}</h5>
              <CloseButton onClick={handleCloseModal} />
            </div>
            <div className="modal-body">
              <Form className="form-group" autoComplete="off">
                <InputFieldWrapper>
                  <Field
                    className="form-control"
                    aria-label="Имя канала"
                    name="name"
                    placeholder={t('forms.channel.placeholder')}
                    innerRef={inputRef}
                  />
                </InputFieldWrapper>
                {touched.name && errors.name && (
                <ErrorMessageContainer>{errors.name}</ErrorMessageContainer>
                )}
                <div className="mt-3 d-flex justify-content-between">
                  <ButtonForm
                    type="success"
                    disabled={isSubmitting}
                  >
                    {t('common.send')}
                  </ButtonForm>
                  <ButtonForm onClick={handleCloseModal} type="secondary">{t('common.cancel')}</ButtonForm>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddChannelModal;
