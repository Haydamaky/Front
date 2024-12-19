import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [],
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState: initialState,
  reducers: {
    setFields(state, action: { payload: [] }) {
      state.fields = action.payload;
    },
  },
});

export const { setFields } = fieldsSlice.actions;

export default fieldsSlice;
