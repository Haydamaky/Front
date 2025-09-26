import store from '@/store';
import { setError } from '@/store/slices/error';
import { isAxiosError } from 'axios';
import { api } from '../api';

export const setErrorIfFailedToRefresh = async () => {
  try {
    console.log('in setErrorIfFailedToRefresh');
    const apiResponse = await api.refreshTokens<{ data: { status: string } }>();
    console.log({ apiResponse });
    return apiResponse?.data?.status === 'success';
  } catch (error) {
    console.log('error in setErrorIfFailedToRefresh');
    if (isAxiosError(error) && error?.response?.status === 401) {
      console.log('refresh token also failed with 401');
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
