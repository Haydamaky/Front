import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import gameSlice from './slices/game';
import fieldsSlice from './slices/fields';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    game: gameSlice.reducer,
    fields: fieldsSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
