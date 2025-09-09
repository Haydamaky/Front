import { client } from '@/api';
import { socket } from '@/socket';
import { AxiosRequestConfig } from 'axios';
import { actions } from './actions';
import { emitWithAck, emitWithoutAck, listenEvents } from './events';
import { API, BuildAPIFunction, Listener } from './types';

const buildAPI: BuildAPIFunction = (
  actions,
  withAck,
  withoutAck,
  listeners,
) => {
  const api = {
    on: {},
    off: {},
  } as API;

  for (const method of withAck) {
    api[method] = async <ReturnValueType>(...args: unknown[]) =>
      new Promise<ReturnValueType>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error(`No response from server for "${method}"`));
        }, 2000);
        const ack = (data: ReturnValueType) => {
          clearTimeout(timeout);
          resolve(data);
        };

        if (args.length > 0) {
          socket.emit(method, ...args, ack);
        } else {
          socket.emit(method, {}, ack);
        }
      });
  }

  for (const method of withoutAck) {
    api[method] = args => socket.emit(method, args);
  }

  for (const event of listeners) {
    api.on[event] = (...handlers) => socket.on(event, ...handlers);
    api.off[event] = (...handlers) => socket.off(event, ...handlers);
  }
  api.onMany = (events: string[], ...handlers: Listener[]) => {
    socket.on(events, ...handlers);
  };
  api.offMany = (events: string[], ...handlers: Listener[]) => {
    socket.off(events, ...handlers);
  };
  api.recconectSocket = () => {
    socket.recconect();
  };
  return api;
};
export const api = buildAPI(actions, emitWithAck, emitWithoutAck, listenEvents);
