import { isAxiosError } from 'axios';
import { DbCall } from '../types';
import { setErrorIfFailedToRefresh } from './setErrorIfFailedToRefresh';

export const retryWrapper = <ReturnValueType>(backendCall: DbCall) => {
  return async (...args: unknown[]): Promise<ReturnValueType | undefined> => {
    try {
      return await backendCall<ReturnValueType>(...args);
    } catch (error) {
      if (!isAxiosError(error)) {
        throw error;
      }

      if (error?.response?.status === 401) {
        const haveUpdatedTokens = await setErrorIfFailedToRefresh();
        if (haveUpdatedTokens) {
          try {
            return await backendCall<ReturnValueType>(...args);
          } catch (retryError: unknown) {
            throw retryError;
          }
        } else {
          return undefined;
        }
      }

      throw error;
    }
  };
};
