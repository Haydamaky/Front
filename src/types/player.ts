import { Game } from './game';

export interface Player {
  id: string;
  money: number;
  userId: string;
  currentFieldIndex: number;
  customFields?: any;
  color: 'green' | 'yellow' | 'blue' | 'purple';
  user: {
    id: string;
    nickname: string;
  };
  gameId: string;
  game: Game;
  createdAt: Date;
  lost: boolean;
  refusedFromAuction?: boolean;
}

export type PlayerColor = 'green' | 'pink' | 'blue' | 'red' | 'yellow';
