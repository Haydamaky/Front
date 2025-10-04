import { socket } from '@/socket';
import { BackendInteraction } from '../types';
import { tiedEvents } from '../events';

export const createEmitWithoutAckCalls = (): BackendInteraction[] => {
  return tiedEvents.map(([emitMethod, ...ackMethods]) => {
    const call = async <ReturnValueType>(...args: unknown[]) => {
      return new Promise<ReturnValueType>((resolve, reject) => {
        const timeout = setTimeout(() => {
          socket.off(ackMethods, ack);
          reject(new Error(`There was an error during "${emitMethod}"`));
        }, 2000);

        const id = crypto.randomUUID();

        const ack = (data: ReturnValueType & { requestId: string }) => {
          if (data.requestId === id) {
            console.log('Clearing timeout for', emitMethod, data);
            clearTimeout(timeout);
            socket.off(ackMethods, ack);
            resolve(data);
          }
        };

        socket.on(ackMethods, ack);
        if (
          (args.length > 0 && typeof args[0] !== 'object') ||
          Array.isArray(args[0])
        ) {
          throw new Error('Data must be an object');
        }
        const data =
          (args[0] as Record<string, unknown>) ||
          ({} as Record<string, unknown>);
        data.requestId = id;
        const otherArgs = args.slice(1) as undefined[];
        if (args.length > 0) {
          if (otherArgs.length > 0) {
            socket.emit(emitMethod, data, ...otherArgs);
          } else {
            socket.emit(emitMethod, data);
          }
        } else {
          socket.emit(emitMethod, { requestId: id });
        }
      });
    };

    return {
      name: emitMethod,
      fn: call,
    };
  });
};
