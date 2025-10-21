import { createAdditionalMethods } from './createCalls/createAdditionalMethods';
import { createEmitWithAckCalls } from './createCalls/createEmitWithAckCall';
import { createEmitWithoutAckCalls } from './createCalls/createEmitWithoutAckCall';
import { createHttpCalls } from './createCalls/createHttpCalls';
import { createOffListeners } from './createCalls/createOffListeners';
import { createOnListeners } from './createCalls/createOnListeners';
import { API, Handler } from './types';
import { attachMethods } from './utils/attachMethods';

const buildAPI = (): API => {
  const api = { on: {}, off: {} } as API;
  api.errorHandlers = {};
  api.setErrorHandlers = (errorHandlers: Record<string, Handler>) => {
    for (const key in errorHandlers) {
      api.errorHandlers[key] = errorHandlers[key];
    }
  };
  attachMethods(api.on, [createOnListeners]);
  attachMethods(api.off, [createOffListeners]);
  attachMethods(api, [
    createHttpCalls(api.errorHandlers),
    createEmitWithAckCalls,
    createEmitWithoutAckCalls,
    createAdditionalMethods,
  ]);
  return api;
};

export const api = buildAPI();
