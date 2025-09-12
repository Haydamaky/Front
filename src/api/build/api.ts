import { createAdditionalMethods } from './createCalls/createAdditionalMethods';
import { createEmitWithAckCalls } from './createCalls/createEmitWithAckCall';
import { createEmitWithoutAckCalls } from './createCalls/createEmitWithoutAckCall';
import { createHttpCalls } from './createCalls/createHttpCalls';
import { createOffListeners } from './createCalls/createOffListeners';
import { createOnListeners } from './createCalls/createOnListeners';
import { API } from './types';
import { attachMethods } from './utils/attachMethods';

const buildAPI = (): API => {
  const api = { on: {}, off: {} } as API;

  attachMethods(api.on, [createOnListeners]);
  attachMethods(api.off, [createOffListeners]);
  attachMethods(api, [
    createHttpCalls,
    createEmitWithAckCalls,
    createEmitWithoutAckCalls,
    createAdditionalMethods,
  ]);

  return api;
};

export const api = buildAPI();
