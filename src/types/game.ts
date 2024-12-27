import { Field } from './field';

export interface Game {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isStarted: boolean;
  players: any[];
  gameFields: [];
  gameMoves: [];
  fieldTransactions: [];
  fields: [];
  turnOfUserId: string;
  playersCapacity: number;
  dices: string;
  turnEnds: string;
}

export interface DataWithGame {
  game: Game;
  fields?: Field[];
}
