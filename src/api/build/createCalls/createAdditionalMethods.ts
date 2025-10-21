import { socket } from '@/socket';
import { BackendInteraction, Handler } from '../types';

export const createAdditionalMethods = (): BackendInteraction[] => {
  const onManyCall = (events: string[], ...handlers: Handler[]) => {
    socket.on(events, ...handlers);
  };
  const offManyCall = (events: string[], ...handlers: Handler[]) => {
    socket.off(events, ...handlers);
  };
  const recconectSocketCall = () => {
    socket.recconect();
  };
  return [
    { name: 'onMany', fn: onManyCall },
    { name: 'offMany', fn: offManyCall },
    { name: 'recconectSocket', fn: recconectSocketCall },
  ];
};
