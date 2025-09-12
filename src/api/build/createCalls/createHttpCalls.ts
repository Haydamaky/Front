import { client } from '@/api';
import { AxiosRequestConfig } from 'axios';
import { actions } from '../actions';
import { BackendInteraction } from '../types';

export const createHttpCalls = (): BackendInteraction[] => {
  return actions.map(action => {
    const httpCall = <ReturnValueType>(...args: unknown[]) => {
      if (action.pathParameter) {
        const [pathParameter, ...config] = args;
        return client[action.method]<ReturnValueType>(
          action.path + '/' + pathParameter,
          config as AxiosRequestConfig<any> | undefined,
        );
      }
      return client[action.method]<ReturnValueType>(action.path, ...args);
    };
    return {
      name: action.name,
      fn: httpCall,
    };
  });
};
