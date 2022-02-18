/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-cycle */
import React from 'react';
import RenameChannelModal from './RenameChannelModal.jsx';
import { actions as modalActions } from '../../slices/modalSlice.js';
import AddChannelModal from './AddChannelModal.jsx';
import DeleteChannelModal from './DeleteChannelModal.jsx';
import { RENAME_CHANNEL, REMOVE_CHANNEL, ADD_CHANNEL } from '../../types.js';

import store from '../../slices/index.js';

const { dispatch } = store;

// Handlers открытия и закрытия модальных окон

export const handleCloseModal = () => {
  dispatch(modalActions.closeModal());
};

export const handleOpenModal = ({ type, id = null }) => {
  dispatch(modalActions.openModal({ type, id }));
};

// Отрисовывает нужное модальное окно по переданному типу из ModalContainer

export const handleModalComponent = (type) => {
  switch (type) {
    case ADD_CHANNEL:
      return <AddChannelModal />;
    case REMOVE_CHANNEL:
      return <DeleteChannelModal />;
    case RENAME_CHANNEL:
      return <RenameChannelModal />;
    default:
      throw new Error('Unknown type of modal window.');
  }
};

// Объекты с типом модального окна и id

const modalRemoveChannelInfo = (id) => ({
  dispatch,
  type: REMOVE_CHANNEL,
  id,
});
const modalRenameChannelInfo = (id) => ({
  dispatch,
  type: RENAME_CHANNEL,
  id,
});

const modalAddChannelInfo = () => ({
  dispatch,
  type: ADD_CHANNEL,
});

export { modalRemoveChannelInfo, modalRenameChannelInfo, modalAddChannelInfo };
