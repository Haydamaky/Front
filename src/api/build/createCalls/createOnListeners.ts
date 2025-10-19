import { socket } from '@/socket';
import { listenEvents } from '../events';
import { BackendInteraction, Hanlder, SubscribeFn } from '../types';

export const createOnListeners = (): BackendInteraction[] => {
  return listenEvents.map(event => {
    const call: SubscribeFn = (...handlers: Hanlder[]) =>
      socket.on(event, ...handlers);

    return {
      name: event,
      fn: call,
    };
  });
};
