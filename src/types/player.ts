import { Game } from './game';

export interface Player {
  id: string;
  money: number;
  userId: string;
  currentFieldIndex: number;
  customFields?: any;
  color: string;
  user: any;
  gameId: string;
  game: Game;
  createdAt: Date;
  lost: boolean;
}

export type PlayerColor = 'green' | 'pink' | 'blue' | 'red' | 'yellow';
