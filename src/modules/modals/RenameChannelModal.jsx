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
import CloseButton from './common/components/CloseButton.jsx';
import SocketContext from '../../contexts/socketContext.jsx';
import Modal from './common/components/Modal.jsx';
import ModalContent from './common/components/ModalContent.jsx';
import ModalHeader from './common/components/ModalHeader.jsx';
import ModalTitle from './common/components/ModalTitle.jsx';
import ModalBody from './common/components/ModalBody.jsx';
import ButtonGroup from './common/components/ButtonGroup.jsx';

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
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{t('modals.rename.header')}</ModalTitle>
              <CloseButton onClick={handleCloseModal} />
            </ModalHeader>
            <ModalBody>
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
                <ButtonGroup>
                  <ButtonForm
                    type="success"
                    disabled={isSubmitting}
                  >
                    {t('common.send')}
                    <Label>{t('common.send')}</Label>
                  </ButtonForm>
                  <ButtonForm onClick={handleCloseModal} type="secondary">{t('common.cancel')}</ButtonForm>
                </ButtonGroup>
              </Form>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
};

export default RenameChannelModal;
