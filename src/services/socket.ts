import io from 'socket.io-client';
import { IDeveloper } from '../components/Match';

interface IQuery {
  developer_id: string;
}

const socket = io(process.env.EXPO_SOCKET_URL, {
  autoConnect: false,
});

export function connect(query: IQuery) {
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

export function subscribe(
  event: string,
  callback: (developer: IDeveloper) => void
) {
  socket.on(event, callback);
}

export default socket;
