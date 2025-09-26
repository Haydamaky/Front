import { client } from '@/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
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
  loading: true,
  isError: false,
};

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, thunkAPI) => {
    try {
      const response = await client.get('auth/local/me');
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
    setUserState: (state, action: PayloadAction<User>) => {
      state.data = { ...action.payload };
    },
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

export const { resetUserState, setUserState } = slice.actions;
export default slice;
