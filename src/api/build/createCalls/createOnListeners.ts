import { socket } from '@/socket';
import { listenEvents } from '../events';
import { BackendInteraction, Handler, SubscribeFn } from '../types';

export const createOnListeners = (): BackendInteraction[] => {
  return listenEvents.map(event => {
    const call: SubscribeFn = (...handlers: Handler[]) =>
      socket.on(event, ...handlers);

    return {
      name: event,
      fn: call,
    };
  });
};
