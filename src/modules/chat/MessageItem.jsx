import React from 'react';

const MessageItem = ({ author, message }) => (
  <div className="d-block text-break mb-3 p-3 rounded bg-light" style={{ maxWidth: 'fit-content' }}>
    <b>
      {author}
      :
      {' '}
    </b>
    {message}
  </div>
);

export default MessageItem;
