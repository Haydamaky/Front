import { socket } from '@/socket';
import { BackendInteraction } from '../types';
import { emitWithoutAck } from '../events';

export const createEmitWithoutAckCalls = (): BackendInteraction[] => {
  return emitWithoutAck.map(method => {
    const call = (...args: unknown[]) => socket.emit(method, ...args);

    return {
      name: method,
      fn: call,
    };
  });
};
