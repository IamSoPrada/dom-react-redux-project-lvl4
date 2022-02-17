/* eslint-disable max-len */
import { toast } from 'react-toastify';
import { actions as messagesActions } from './slices/messagesInfoSlice.js';
import { actions as channelsActions } from './slices/channelsInfoSlice.js';
import store from './slices/index.js';
import {
  ADD_CHANNEL, REMOVE_CHANNEL, RENAME_CHANNEL, NEW_MESSAGE,
} from './types.js';

const { dispatch } = store;

// Подписка на события сокета.
const socketApi = (socket, i18nInstance) => {
  socket.on(NEW_MESSAGE, (message) => {
    dispatch(messagesActions.addMessage(message));
  });
  socket.on(REMOVE_CHANNEL, ({ id }) => {
    dispatch(channelsActions.deleteChannel(id));
    toast.success(i18nInstance.t('toastify.channels.delete'));
  });
  socket.on(RENAME_CHANNEL, ({ id, name }) => {
    dispatch(channelsActions.renameChannel({ id, name }));
    toast.success(i18nInstance.t('toastify.channels.rename'));
  });
  socket.on(ADD_CHANNEL, (channel) => {
    dispatch(channelsActions.createNewChannel(channel));
    toast.success(i18nInstance.t('toastify.channels.add'));
  });

  return socket;
};
export { socketApi };

// Emit socket event handler.
export const socketEmitEvent = (socket, eventType, value) => {
  if (socket.connected) {
    socket.emit(eventType, value, ({ data }) => {
    // Если добавляем канал, то переключаем текущий канал у создателя
      if (eventType === ADD_CHANNEL) {
        const { id } = data; // data: {name: 'new_channel', removable: true, id: 14}
        dispatch(channelsActions.setCurrentChannel(id));
      }
    });
  } else {
    throw new Error('Ошибка сети. Попробуйте еще раз');
  }
};
