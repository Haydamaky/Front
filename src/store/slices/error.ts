// store/errorSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ErrorState {
  message: string | null;
  status?: number;
}

const initialState: ErrorState = {
  message: null,
  status: undefined,
};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<ErrorState>) {
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
    clearError(state) {
      state.message = null;
      state.status = undefined;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice;
