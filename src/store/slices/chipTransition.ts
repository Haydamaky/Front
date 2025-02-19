import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: false,
};

const chipTransitionSlice = createSlice({
  name: 'chipTransition',
  initialState: initialState,
  reducers: {
    setChipTransition(state, action: { payload: boolean }) {
      state.data = action.payload;
    },
  },
});

export const { setChipTransition } = chipTransitionSlice.actions;

export default chipTransitionSlice;
