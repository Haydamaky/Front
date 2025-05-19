import { socket } from '@/socket';
import { emitWithAck, emitWithoutAck, listenEvents } from './events';
import { API, BuildAPIFunction } from './types';

const buildAPI: BuildAPIFunction = (
  withAck,
  withoutAck,
  listeners,
  config?,
) => {
  const api = {
    on: {},
    off: {},
  } as API;

  for (const method of withAck) {
    api[method] = <ReturnValueType>(...args: unknown[]) =>
      new Promise<ReturnValueType>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`No response from server for "${method}"`));
        }, config?.timeoutMS ?? 1500);

        socket.emit(method, ...args, (data: ReturnValueType) => {
          clearTimeout(timeout);
          resolve(data);
        });
      });
  }

  for (const method of withoutAck) {
    api[method] = (...args) => socket.emit(method, ...args);
  }

  for (const event of listeners) {
    api.on[event] = (...handlers) => socket.on(event, ...handlers);
    api.off[event] = (...handlers) => socket.off(event, ...handlers);
  }

  return api;
};
export const api = buildAPI(emitWithAck, emitWithoutAck, listenEvents);
