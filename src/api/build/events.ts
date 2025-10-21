export const emitWithAck = [
  'getVisibleGames',
  'mutualChatData',
  'chatData',
] as const;
export const tiedEvents = [
  ['getAllGameData', 'gameData', 'error'],
  ['createGame', 'newGameCreated', 'error'],
  ['joinGame', 'onParticipateGame', 'error'],
  ['leaveGame', 'onParticipateGame', 'error'],
  ['rollDice', 'rolledDice', 'error'],
  ['payToBankForSpecialField', 'updatePlayers', 'passTurnToNext', 'error'],
  ['payToUserForSecret', 'updatePlayers', 'error'],
  ['payToBankForSecret', 'updatePlayers', 'passTurnToNext', 'error'],
  ['payForPrivateField', 'payedForField', 'error'],
  ['putUpForAuction', 'hasPutUpForAuction', 'error'],
  ['raisePrice', 'raisedPrice', 'error'],
  ['refuseAuction', 'refusedFromAuction', 'error'],
  ['buyField', 'passTurnToNext', 'error'],
  ['passTurn', 'passTurnToNext', 'error'],
  ['buyBranch', 'updateGameData', 'error'],
  ['sellBranch', 'updateGameData', 'error'],
  ['surrender', 'updateGameData'],
  ['mortgageField', 'updateGameData', 'error'],
  ['newMessage', 'onMessage'],
  ['newGameMessage', 'gameChatMessage'],
  ['unmortgageField', 'updateGameData', 'error'],
  ['refuseFromTrade', 'updateGameData', 'error'],
  ['acceptTrade', 'updateGameData', 'error'],
  ['offerTrade', 'updateGameData', 'tradeOffered', 'error'],
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
