import { isAxiosError } from 'axios';
import { api } from '../api';

export const setErrorIfFailedToRefresh = async () => {
  try {
    const apiResponse = await api.refreshTokens<{ data: { status: string } }>();
    return apiResponse?.data?.status === 'success';
  } catch (error) {
    if (isAxiosError(error) && error?.response?.status === 401) {
      api.errorHandler?.(error);
      return false;
    } else {
      throw error;
    }
  }
};
