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
  playersCapacity: number;
}
