/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MessageInput from './MessageInput.jsx';
import MessageItem from './MessageItem.jsx';

const MessagesContainer = ({ activeChannel, messages }) => {
  const messagesEndRef = useRef(null);
  const { t } = useTranslation();
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {activeChannel?.name}
            </b>
          </p>
          <span className="text-muted">

            {t('chat.messages', { count: messages.length })}

          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5">
          {messages && messages.map(({ id, body, username }) => <MessageItem key={id} message={body} author={username} />)}
          <div ref={messagesEndRef} />
        </div>

        <div className="mt-auto px-5 py-3">
          <MessageInput activeChannelId={activeChannel?.id} />
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
