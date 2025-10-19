import { socket } from '@/socket';
import { BackendInteraction, Hanlder } from '../types';

export const createAdditionalMethods = (): BackendInteraction[] => {
  const onManyCall = (events: string[], ...handlers: Hanlder[]) => {
    socket.on(events, ...handlers);
  };
  const offManyCall = (events: string[], ...handlers: Hanlder[]) => {
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
