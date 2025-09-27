import store from '@/store';
import { setError } from '@/store/slices/error';
import { isAxiosError } from 'axios';
import { api } from '../api';

export const setErrorIfFailedToRefresh = async () => {
  try {
    const apiResponse = await api.refreshTokens<{ data: { status: string } }>();
    return apiResponse?.data?.status === 'success';
  } catch (error) {
    if (isAxiosError(error) && error?.response?.status === 401) {
      store.dispatch(
        setError({
          message: 'Session expired. Please log in again.',
          status: 401,
        }),
      );
    } else {
      throw error;
    }
  }
};
