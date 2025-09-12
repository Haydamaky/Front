import { BackendInteraction } from '../types';

export const addMethodToObject = (
  obj: Record<string, unknown>,
  call: BackendInteraction,
) => {
  obj[call.name] = call.fn;
};
