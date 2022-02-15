import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Chat from '../components/chat/index.jsx';
import ModalContainer from '../components/modals/ModalContainer.jsx';
import { getChannels } from '../slices/channelsInfoSlice.js';

const ChatPage = () => {
  const dispatch = useDispatch();
  const isOpened = useSelector(({ modal }) => modal.isOpened);
  const modalType = useSelector(({ modal }) => modal.type);
  const status = useSelector((state) => state.channelsInfo.status);
  useEffect(() => {
    switch (status) {
      case 'idle':
        return dispatch(getChannels());
      case 'loading':
        return toast.info('Загрузка каналов...');
      case 'success':
        toast.dismiss();
        return toast.success('Каналы загружены');
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
