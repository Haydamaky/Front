import { io } from 'socket.io-client';
import { UpgradedSocket } from './lib/UpgradedSocket';

export const createSocket = () => {
  const socketIO = io(process.env.API_URL, { withCredentials: true });
  return socketIO;
};

const socketIO = createSocket();
export const socket = new UpgradedSocket(socketIO);
