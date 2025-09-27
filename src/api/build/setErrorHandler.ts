import store from '@/store';
import { api } from './api';
import { setError } from '@/store/slices/error';
const errorHandler = (error: any) => {
  store.dispatch(
    setError({
      message: 'Session expired. Please log in again.',
      status: 401,
    }),
  );
};

api.setErrorHandler(errorHandler);
