import { TradeDataLocal } from '@/types/trade';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null as TradeDataLocal | null,
};

const tradeSlice = createSlice({
  name: 'trade',
  initialState: initialState,
  reducers: {
    setTrade(state, action: { payload: TradeDataLocal | null }) {
      state.data = action.payload;
    },
  },
});

export const { setTrade } = tradeSlice.actions;

export default tradeSlice;
