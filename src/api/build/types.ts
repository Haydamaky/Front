import { AxiosResponse } from 'axios';
import { ActionNames } from './actions';
import { EventsWithAck, EventsWithListener, EventsWithoutAck } from './events';

export type DbCall = <ReturnValueType>(
  ...args: unknown[]
) => Promise<ReturnValueType | any>;
export type Hanlder = (data: any) => void;

export type SubscribeFn = (...handlers: Hanlder[]) => void;

type SubscriptionEvents = Record<EventsWithListener, SubscribeFn>;

type API = {
  [key in EventsWithAck | EventsWithoutAck | ActionNames]: DbCall;
} & {
  setErrorHandlers: (errorHandlers: Record<string, Hanlder>) => void;
  errorHandlers: Record<string, Hanlder>;
  on: SubscriptionEvents;
  off: SubscriptionEvents;
  onMany: (
    events: EventsWithListener[] | EventsWithAck[],
    ...handlers: Hanlder[]
  ) => void;
  offMany: (
    events: EventsWithListener[] | EventsWithAck[],
    ...handlers: Hanlder[]
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
