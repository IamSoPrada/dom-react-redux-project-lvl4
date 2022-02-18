import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Chat from '../modules/chat/index.jsx';
import ModalContainer from '../modules/modals/ModalContainer.jsx';
import { getChannels } from '../slices/channelsInfoSlice.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isOpened = useSelector(({ modal }) => modal.isOpened);
  const modalType = useSelector(({ modal }) => modal.type);
  const status = useSelector((state) => state.channelsInfo.status);
  useEffect(() => {
    switch (status) {
      case 'idle':
        return dispatch(getChannels());
      case 'loading':
        return toast.info(t('toastify.channels.channelsLoading'));
      case 'success':
        toast.dismiss();
        return toast.success(t('toastify.channels.channelsLoaded'));
      case 'error':
        toast.dismiss();
        return toast.error(t('toastify.channels.channelsNetworkError'));
      default:
        return null;
    }
  }, [status]);
  return (
    <>
      <Chat />
      {isOpened
      && <ModalContainer type={modalType} />}
    </>
  );
};

export default ChatPage;
