import { Game } from '@/types/game';
import { configureStore } from '@reduxjs/toolkit';
import GameReducer from './GameSlice/GameSlice';

export type storeType = {
  game: Game;
};

export const store = configureStore({
  reducer: {
    game: GameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
