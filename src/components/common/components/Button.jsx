import React from 'react';

const ButtonForm = ({
  children, type, disabled, onClick,
}) => (
  <button onClick={onClick} className={`w-100 mb-3 btn btn-${type}`} type="submit" disabled={disabled}>{children}</button>
);

export default ButtonForm;
