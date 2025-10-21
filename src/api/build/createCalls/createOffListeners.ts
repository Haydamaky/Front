import { socket } from '@/socket';
import { listenEvents } from '../events';
import { BackendInteraction, Handler } from '../types';

export const createOffListeners = (): BackendInteraction[] => {
  return listenEvents.map(event => {
    const call = (...handlers: Handler[]) => socket.off(event, ...handlers);

    return {
      name: event,
      fn: call,
    };
  });
};
