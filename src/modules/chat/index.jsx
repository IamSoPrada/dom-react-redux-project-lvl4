/* eslint-disable max-len */
import React from 'react';
import { useSelector } from 'react-redux';
import ChannelsList from './ChannelsList.jsx';
import MessagesContainer from './MessagesContainer.jsx';

const Chat = () => {
  const channels = useSelector((state) => state.channelsInfo.channels);
  const allMessages = useSelector((state) => state.messagesInfo.messages);
  const activeChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const activeChannel = channels?.find((channel) => channel.id === activeChannelId);
  const messagesFromCurrentChannel = allMessages?.filter(({ channelId }) => channelId === activeChannelId);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList channels={channels} />
        <MessagesContainer activeChannel={activeChannel} messages={messagesFromCurrentChannel} />
      </div>
    </div>
  );
};

export default Chat;
