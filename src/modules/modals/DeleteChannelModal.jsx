/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SocketContext from '../../contexts/socketContext.jsx';
import CloseButton from './common/components/CloseButton.jsx';
import Label from '../common/components/Label.jsx';
import ButtonForm from '../common/components/Button.jsx';
import Modal from './common/components/Modal.jsx';
import ModalContent from './common/components/ModalContent.jsx';
import ModalHeader from './common/components/ModalHeader.jsx';
import ModalBody from './common/components/ModalBody.jsx';
import ModalTitle from './common/components/ModalTitle.jsx';
import ButtonGroup from './common/components/ButtonGroup.jsx';

import { handleCloseModal } from './utils.js';
import { socketEmitEvent } from '../../socketApi.js';
import { REMOVE_CHANNEL } from '../../types.js';

const DeleteChannelModal = () => {
  const { t } = useTranslation();
  const { socket } = useContext(SocketContext);
  const channelId = useSelector(({ modal }) => modal.channelId);

  const onSubmitForm = (e) => {
    e.preventDefault();
    const channel = {
      id: channelId,
    };
    socketEmitEvent(socket, REMOVE_CHANNEL, channel);
    handleCloseModal();
  };
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{t('modals.remove.header')}</ModalTitle>
          <CloseButton onClick={handleCloseModal} />
        </ModalHeader>
        <ModalBody>
          <p>{t('modals.remove.confirm')}</p>
          <form onSubmit={onSubmitForm} className="py-1 border rounded-2">
            <ButtonGroup>
              <ButtonForm
                type="danger"
              >
                {t('common.delete')}
                <Label>{t('common.delete')}</Label>
              </ButtonForm>
              <ButtonForm onClick={handleCloseModal} type="secondary">{t('common.cancel')}</ButtonForm>
            </ButtonGroup>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeleteChannelModal;
