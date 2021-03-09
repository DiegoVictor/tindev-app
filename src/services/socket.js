import io from 'socket.io-client';
// eslint-disable-next-line import/no-unresolved
import { SOCKET_URL } from '@env';

const socket = io(SOCKET_URL, {
  autoConnect: false,
});

export function connect(query) {
  if (typeof query === 'object') {
    socket.io.opts.query = query;
  }
  socket.connect();
}

export function disconnect() {
  if (socket.connected) {
    socket.disconnect();
  }
}

export function subscribe(event, callback) {
  socket.on(event, callback);
}

export default socket;
