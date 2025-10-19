import { Game } from '@/types/game';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  game: {} as Game,
  loading: true,
  error: null as string | null,
};

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setGame(state, action: { payload: Game }) {
      state.game = action.payload;
    },
    setLoadingGame(state, action: { payload: boolean }) {
      state.loading = action.payload;
    },
    setErrorGame(state, actions: { payload: string | null }) {
      state.error = actions.payload;
    },
    updatePlayers(state, action: { payload: [] }) {
      state.game.players = action.payload;
    },
  },
});

export const { updatePlayers, setGame, setLoadingGame, setErrorGame } =
  gameSlice.actions;

export default gameSlice;
