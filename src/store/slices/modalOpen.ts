import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  surrenderModalOpen: false,
};

const modalOpenSlice = createSlice({
  name: 'modalOpen',
  initialState: initialState,
  reducers: {
    setSurrenderModalOpen(state, action: { payload: boolean }) {
      state.surrenderModalOpen = action.payload;
    },
  },
});

export const { setSurrenderModalOpen } = modalOpenSlice.actions;

export default modalOpenSlice;
