import { Field } from './field';
import { Player } from './player';

export interface Game {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isStarted: boolean;
  players: Player[];
  gameFields: [];
  gameMoves: [];
  fieldTransactions: [];
  fields: [];
  turnOfUserId: string;
  playersCapacity: number;
  dices: string;
  chat: { id: string };
  turnEnds: string;
}

export interface DataWithGame {
  game: Game;
  fields?: Field[];
}
