// @ts-check

const host = '';
const prefix = 'api/v1';

export default {
  dataPath: () => [host, prefix, 'data'].join('/'),
  loginPath: () => [host, prefix, 'login'].join('/'),
  signUpPath: () => [host, prefix, 'signup'].join('/'),
  channelsPath: () => [host, prefix, 'channels'].join('/'),
  channelPath: (id) => [host, prefix, 'channels', id].join('/'),
  channelMessagesPath: (id) => [host, prefix, 'channels', id, 'messages'].join('/'),
};
