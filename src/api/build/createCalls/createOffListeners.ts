import { socket } from '@/socket';
import { listenEvents } from '../events';
import { BackendInteraction, Hanlder as Listener } from '../types';

export const createOffListeners = (): BackendInteraction[] => {
  return listenEvents.map(event => {
    const call = (...handlers: Listener[]) => socket.off(event, ...handlers);

    return {
      name: event,
      fn: call,
    };
  });
};
