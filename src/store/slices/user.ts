import { client } from '@/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type User = {
  id: string;
  nickname: string;
  email: string;
};

type InitialState = {
  data: User | null | undefined;
  loading: boolean;
  isError: boolean;
};

const initialState: InitialState = {
  data: null,
  loading: false,
  isError: false,
};

const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (userId: string, thunkAPI) => {
    try {
      const response = await client.get(`user/${userId}`);

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserState: () => initialState,
  },

  extraReducers(builder) {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isError = false;
      state.loading = false;
    });

    builder.addCase(getUserInfo.rejected, (state, payload) => {
      state.isError = true;
      state.loading = false;
    });

    builder.addCase(
      getUserInfo.pending,
      (state, action) => void (state.loading = true),
    );
  },
});

export const { resetUserState } = slice.actions;
export default slice;
