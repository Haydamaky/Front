import { socket } from '@/socket';
import { listenEvents } from '../events';
import { BackendInteraction, Listener, SubscribeFn } from '../types';

export const createOnListeners = (): BackendInteraction[] => {
  return listenEvents.map(event => {
    const call: SubscribeFn = (...handlers: Listener[]) =>
      socket.on(event, ...handlers);

    return {
      name: event,
      fn: call,
    };
  });
};
