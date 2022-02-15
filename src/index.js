import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import init from './index.jsx';

const render = async () => {
  const socket = io({
    rejectUnauthorized: false,
  });
  const vDom = await init(socket);
  ReactDOM.render(
    vDom, document.getElementById('chat'),
  );
};

render();
