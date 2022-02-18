import React from 'react';
import { useTranslation } from 'react-i18next';
import ChannelsItem from './ChannelsItem.jsx';
import { handleOpenModal, modalAddChannelInfo } from '../modals/utils.js';

const ChannelsList = ({ channels }) => {
  const addChannelInfo = modalAddChannelInfo();
  const { t } = useTranslation();
  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white border-right" style={{ maxWidth: '250px' }}>
      <div href="/" className="d-flex align-items-center justify-content-between flex-shrink-0 p-3 link-dark text-decoration-none ">
        <span className="fs-5 d-block fw-semibold m-2">{t('channels.title')}</span>
        <button role="button" onClick={() => handleOpenModal(addChannelInfo)} type="button" className="px-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="d-none">+</span>
        </button>
      </div>
      <ul className="list-group list-group-flush scrollarea">
        {channels?.map(({ id, ...props }) => <ChannelsItem id={id} key={id} props={props} />)}
      </ul>
    </div>
  );
};

export default ChannelsList;
