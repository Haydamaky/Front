import { socket } from '@/socket';
import { emitWithAck } from '../events';
import { BackendInteraction } from '../types';

export const createEmitWithAckCalls = (): BackendInteraction[] => {
  return emitWithAck.map(method => {
    const call = async <ReturnValueType>(...args: unknown[]) => {
      return new Promise<ReturnValueType>((resolve, reject) => {
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
    };

    return {
      name: method,
      fn: call,
    };
  });
};
