/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SocketContext from '../../contexts/socketContext.jsx';
import CloseButton from './common/components/CloseButton.jsx';
import Label from '../common/components/Label.jsx';
import ButtonForm from '../common/components/Button.jsx';
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
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{t('modals.remove.header')}</h5>
          <CloseButton onClick={handleCloseModal} />
        </div>
        <div className="modal-body">
          <p>{t('modals.remove.confirm')}</p>
          <form onSubmit={onSubmitForm} className="py-1 border rounded-2">
            <div className="mt-3 d-flex justify-content-between">
              <ButtonForm
                type="danger"
              >
                {t('common.delete')}
                <Label>{t('common.delete')}</Label>
              </ButtonForm>
              <ButtonForm onClick={handleCloseModal} type="secondary">{t('common.cancel')}</ButtonForm>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteChannelModal;
