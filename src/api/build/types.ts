import { ActionNames } from './actions';
import { EventsWithAck, EventsWithListener, EventsWithoutAck } from './events';

type DbCall = <ReturnValueType>(...args: unknown[]) => Promise<ReturnValueType>;
export type Listener = (data: unknown) => void;

export type SubscribeFn = (...handlers: Listener[]) => void;

type SubscriptionEvents = Record<EventsWithListener, SubscribeFn>;

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

type InteractionNames =
  | EventsWithAck
  | EventsWithoutAck
  | ActionNames
  | EventsWithListener;

interface BackendInteraction {
  name: InteractionNames | 'onMany' | 'offMany' | 'recconectSocket';
  fn:
    | DbCall
    | SubscribeFn
    | API['onMany']
    | API['offMany']
    | API['recconectSocket'];
}

export type { API, BackendInteraction };
