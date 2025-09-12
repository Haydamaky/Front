import { API, BackendInteraction } from '../types';
import { addMethodToObject } from './addMethodToObject';

export const attachMethods = (
  target: API | API['on'],
  creators: (() => BackendInteraction[])[],
) => {
  creators
    .flatMap(fn => fn())
    .forEach(method => addMethodToObject(target, method));
};
