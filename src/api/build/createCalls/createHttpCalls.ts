import { client } from '@/api';
import { actions } from '../actions';
import { CreatedCall } from '../types';
import { AxiosRequestConfig } from 'axios';

const createHttpCalls = () => {
  const createdCalls: CreatedCall[] = [];
  for (const action of actions) {
    const call = <ReturnValueType>(...args: unknown[]) => {
      if (action.pathParameter) {
        const [pathParameter, ...config] = args;
        return client[action.method]<ReturnValueType>(
          action.path + '/' + pathParameter,
          config as AxiosRequestConfig<any> | undefined,
        );
      } else {
        return client[action.method]<ReturnValueType>(action.path, ...args);
      }
    };
    const createdCall: CreatedCall = {
      name: action.name,
      fn: call,
    };
    createdCalls.push(createdCall);
  }
  return createdCalls;
};
