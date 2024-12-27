import { Field } from '@/types/field';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [] as Field[],
};

const fieldsSlice = createSlice({
  name: 'fields',
  initialState: initialState,
  reducers: {
    setFields(state, action: { payload: Field[] }) {
      state.fields = action.payload;
    },
  },
});

export const { setFields } = fieldsSlice.actions;

export default fieldsSlice;
