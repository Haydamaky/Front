export const emitWithAck = [
  'getVisibleGames',
  'mutualChatData',
  'chatData',
] as const;
export const emitWithoutAck = [
  'getAllGameData',
  'createGame',
  'joinGame',
  'leaveGame',
  'rollDice',
  'payToBankForSpecialField',
  'payToUserForSecret',
  'payToBankForSecret',
  'payForPrivateField',
  'putUpForAuction',
  'raisePrice',
  'refuseAuction',
  'buyField',
  'passTurn',
  'buyBranch',
  'sellBranch',
  'surrender',
  'mortgageField',
  'newMessage',
  'onMessage',
  'newGameMessage',
  'unmortgageField',
  'payForField',
  'refuseFromTrade',
  'acceptTrade',
  'offerTrade',
] as const;
export const listenEvents = [
  'error',
  'onMessage',
  'gameChatMessage',
  'rejoin',
  'gameData',
  'newGameCreated',
  'onParticipateGame',
  'updatePlayers',
  'updateGameData',
  'playerSurrendered',
  'tradeOffered',
  'playerWon',
  'raisedPrice',
  'rolledDice',
  'refusedFromAuction',
  'passTurnToNext',
  'secret',
  'payedForField',
  'hasPutUpForAuction',
  'clearStartedGame',
  'startGame',
] as const;

export type EventsWithAckArr = typeof emitWithAck;
export type EventsWithoutAckArr = typeof emitWithoutAck;
export type EventsWithListenerArr = typeof listenEvents;

export type EventsWithAck = EventsWithAckArr[number];
export type EventsWithoutAck = EventsWithoutAckArr[number];
export type EventsWithListener = EventsWithListenerArr[number];
