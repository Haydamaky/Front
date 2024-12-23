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
}
