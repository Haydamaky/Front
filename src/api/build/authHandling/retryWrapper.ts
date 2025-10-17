import { isAxiosError } from 'axios';
import { DbCall, Hanlder } from '../types';
import { setErrorIfFailedToRefresh } from './setErrorIfFailedToRefresh';

export const retryWrapper = <ReturnValueType>(
  backendCall: DbCall,
  errorHandlers: Record<string, Hanlder>,
) => {
  return async (...args: unknown[]): Promise<ReturnValueType | undefined> => {
    try {
      return await backendCall<ReturnValueType>(...args);
    } catch (error) {
      if (!isAxiosError(error)) {
        throw error;
      }

      if (error?.response?.status === 401) {
        if (errorHandlers['userErrorHandler']) {
          errorHandlers['userErrorHandler'](error);
        }
        const haveUpdatedTokens =
          await setErrorIfFailedToRefresh(errorHandlers);
        if (haveUpdatedTokens) {
          try {
            return backendCall<ReturnValueType>(...args);
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
