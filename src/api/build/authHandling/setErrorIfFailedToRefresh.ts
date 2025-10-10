import { isAxiosError } from 'axios';
import { api } from '../api';
import { Hanlder } from '../types';

export const setErrorIfFailedToRefresh = async (
  errorHandlers: Record<string, Hanlder>,
) => {
  try {
    const apiResponse = await api.refreshTokens<{ data: { status: string } }>();
    api.recconectSocket();
    return apiResponse?.data?.status === 'success';
  } catch (error) {
    if (isAxiosError(error) && error?.response?.status === 401) {
      errorHandlers['errorHandler']?.(error);
      return false;
    } else {
      throw error;
    }
  }
};
