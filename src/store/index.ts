import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import gameSlice from './slices/game';
import fieldsSlice from './slices/fields';
import chipTransitionSlice from './slices/chipTransition';
import tradeSlice from './slices/trade';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    game: gameSlice.reducer,
    fields: fieldsSlice.reducer,
    chipTransition: chipTransitionSlice.reducer,
    trade: tradeSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
