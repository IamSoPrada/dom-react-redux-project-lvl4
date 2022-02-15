import React from 'react';
import { handleModalComponent } from './utils.js';

const ModalContainer = ({ type }) => {
  const modal = handleModalComponent(type);
  return (
    <>
      <div className="fade modal-backdrop show" />
      <div role="dialog" aria-modal className="fade modal show" tabIndex={-1} style={{ display: 'block' }}>{modal}</div>
    </>
  );
};

export default ModalContainer;
