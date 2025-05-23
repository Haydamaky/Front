import { Socket } from 'socket.io-client';
import { emitWithAck, emitWithoutAck, listenEvents } from './events';

type EventsWithAckArr = typeof emitWithAck;
type EventsWithoutAckArr = typeof emitWithoutAck;
type EventsWithListenerArr = typeof listenEvents;

type EmitMethod = <ReturnValueType>(
  data: unknown,
) => Promise<ReturnValueType> | any;
type Listener = (data: any) => void | Promise<void>;
type EventsWithAck = EventsWithAckArr[number];
type EventsWithoutAck = EventsWithoutAckArr[number];
type EventsWithListener = EventsWithListenerArr[number];

type SubscriptionEvents = Record<
  EventsWithListener,
  (...handlers: Listener[]) => void
>;

type API = {
  [key in EventsWithAck | EventsWithoutAck]: EmitMethod;
} & {
  on: SubscriptionEvents;
  off: SubscriptionEvents;
};

type APIConfig = {
  timeoutMS?: number;
};

type BuildAPIFunction = (
  withAck: EventsWithAckArr,
  withoutAck: EventsWithoutAckArr,
  listeners: EventsWithListenerArr,
  config?: APIConfig,
) => API;

export type { BuildAPIFunction, API };
