import { io } from 'socket.io-client';
import { UpgradedSocket } from './lib/UpgradedSocket';

export const socketIO = io('http://localhost:3000/', { withCredentials: true });

export const socket = new UpgradedSocket(socketIO);
