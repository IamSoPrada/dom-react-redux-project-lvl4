/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import React, { useContext, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import filter from 'leo-profanity';
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
  const AddChannelSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(2, t('modals.validation.minLength'))
      .max(18, t('modals.validation.maxLength'))
      .required(t('modals.validation.required'))
      .notOneOf([...channelsNames], t('modals.errors.uniqueName')),
  });

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
              <button role="button" onClick={handleCloseModal} type="button" className="p-0 text-primary btn btn-group-vertical" data-bs-dismiss="modal" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <Form className="form-group" autoComplete="off">
                <div className="form-floating mb-2 form-group">
                  <Field
                    className="form-control"
                    aria-label="Имя канала"
                    name="name"
                    placeholder={t('forms.channel.placeholder')}
                    innerRef={inputRef}
                  />
                </div>
                {touched.name && errors.name && (
                <div className="mb-2 text-danger">{errors.name}</div>
                )}
                <div className="mt-3 d-flex justify-content-between">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {t('common.send')}
                  </button>
                  <button role="button" onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('common.cancel')}</button>
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
