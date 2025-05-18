export const emitWithAck = [
  'rect',
  'move',
  'rotate',
  'read',
  'render',
  'resize',
  'hello',
] as const;

export const emitWithoutAck = ['ack'] as const;
export const listenEvents = [
  'tradeAccepted',
  'playerJoined',
  'gameStarted',
] as const;
