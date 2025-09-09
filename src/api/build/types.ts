import { ActionNames, actions } from './actions';
import { emitWithAck, emitWithoutAck, listenEvents } from './events';

type EventsWithAckArr = typeof emitWithAck;
type EventsWithoutAckArr = typeof emitWithoutAck;
type EventsWithListenerArr = typeof listenEvents;
type Actions = typeof actions;

type DbCall = <ReturnValueType>(
  ...data: unknown[]
) => Promise<ReturnValueType> | any;
export type Listener = (data: any) => void | Promise<void> | any;
type EventsWithAck = EventsWithAckArr[number];
type EventsWithoutAck = EventsWithoutAckArr[number];
type EventsWithListener = EventsWithListenerArr[number];

type SubscriptionEvents = Record<
  EventsWithListener,
  (...handlers: Listener[]) => void
>;

type API = {
  [key in EventsWithAck | EventsWithoutAck | ActionNames]: DbCall;
} & {
  on: SubscriptionEvents;
  off: SubscriptionEvents;
  onMany: (
    events: EventsWithListener[] | EventsWithAck[],
    ...handlers: Listener[]
  ) => void;
  offMany: (
    events: EventsWithListener[] | EventsWithAck[],
    ...handlers: Listener[]
  ) => void;
  recconectSocket: () => void;
};

interface CreatedCall {
  name: string;
  fn: DbCall;
}

type BuildAPIFunction = (
  actions: Actions,
  withAck: EventsWithAckArr,
  withoutAck: EventsWithoutAckArr,
  listeners: EventsWithListenerArr,
) => API;

export type { BuildAPIFunction, API, CreatedCall };
