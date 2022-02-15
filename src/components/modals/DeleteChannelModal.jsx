/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import SocketContext from '../../contexts/socketContext.jsx';
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
          <button role="button" onClick={handleCloseModal} type="button" className="p-0 text-primary btn btn-group-vertical" data-bs-dismiss="modal" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <p>{t('modals.remove.confirm')}</p>
          <form onSubmit={onSubmitForm} className="py-1 border rounded-2">

            <div className="mt-3 d-flex justify-content-between">
              <button
                className="btn btn-danger"
                type="submit"
              >
                {t('common.delete')}
                <span className="d-none">{t('common.delete')}</span>
              </button>
              <button onClick={handleCloseModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">{t('common.cancel')}</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default DeleteChannelModal;
