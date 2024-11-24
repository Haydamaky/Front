import { Game } from '@/types/game';
import { createSlice } from '@reduxjs/toolkit';

export type initialStateType = {
  paymentAmount: number;
  paymentDiscount: number;
};

const initialState = {
  game: {} as Game,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setGame(state, action: { payload: Game }) {
      state.game = action.payload;
    },
    updatePlayers(state, action: { payload: [] }) {
      state.game.players = action.payload;
    },
  },
});

export const { updatePlayers, setGame } = gameSlice.actions;

export default gameSlice;
