/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import filter from 'leo-profanity';
import createModalValidationSchema from './modalValidationSchema.js';
import Label from '../common/components/Label.jsx';
import ErrorMessageContainer from '../common/components/ErrorMessageContainer.jsx';
import InputFieldWrapper from '../common/components/InputFieldWrapper.jsx';
import ButtonForm from '../common/components/Button.jsx';
import SocketContext from '../../contexts/socketContext.jsx';
import { handleCloseModal } from './utils.js';
import { socketEmitEvent } from '../../socketApi.js';
import { RENAME_CHANNEL } from '../../types.js';

const RenameChannelModal = () => {
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const channelId = useSelector(({ modal }) => modal.channelId);
  const channels = useSelector(({ channelsInfo }) => channelsInfo.channels);
  const channelsNames = channels.map(({ name }) => name);
  const RenameChannelSchema = createModalValidationSchema(channelsNames, t);

  const handleFormSubmit = (values) => {
    const { name } = values;
    const channel = {
      name: filter.clean(name),
      id: channelId,
    };
    socketEmitEvent(socket, RENAME_CHANNEL, channel);
    handleCloseModal();
  };
  useEffect(() => inputRef.current?.focus(), []);
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={RenameChannelSchema}
      onSubmit={(values, { resetForm }) => {
        handleFormSubmit(values);
        resetForm();
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{t('modals.rename.header')}</h5>
              <button onClick={handleCloseModal} type="button" className="p-0 text-primary btn btn-group-vertical" data-bs-dismiss="modal" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <Form className="form-group" autoComplete="off">
                <InputFieldWrapper>
                  <Field
                    className="form-control"
                    name="name"
                    aria-label="Имя канала"
                    innerRef={inputRef}
                    placeholder={t('forms.channel.placeholder')}
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
                    <Label>{t('common.send')}</Label>
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

export default RenameChannelModal;
