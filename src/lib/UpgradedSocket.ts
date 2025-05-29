import { createSocket } from '@/socket';
import { Socket } from 'socket.io-client';

type EventCallback = (data: any) => void;

export class UpgradedSocket {
  constructor(private socket: Socket) {}

  on(eventsOrEvent: string | string[], ...callbacks: EventCallback[]) {
    const events = Array.isArray(eventsOrEvent)
      ? eventsOrEvent
      : [eventsOrEvent];

    events.forEach(event => {
      callbacks.forEach(callback => this.socket.on(event, callback));
    });
  }

  off(eventsOrEvent: string | string[], ...callbacks: EventCallback[]) {
    const events = Array.isArray(eventsOrEvent)
      ? eventsOrEvent
      : [eventsOrEvent];

    events.forEach(event => {
      if (callbacks.length > 0) {
        callbacks.forEach(callback => this.socket.off(event, callback));
      } else {
        this.socket.off(event);
      }
    });
  }

  emitWithCallbacks(event: string, ...callbacks: EventCallback[]) {
    this.socket.emit(event, (data: unknown) => {
      callbacks.forEach(callback => callback(data));
    });
  }

  emit(
    event: string,
    data?: unknown | EventCallback,
    callback?: EventCallback,
  ) {
    return this.socket.emit(event, data, callback);
  }

  recconect() {
    this.socket.disconnect();
    this.socket = createSocket();
    return this;
  }
}
