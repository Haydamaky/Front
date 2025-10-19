import store from '@/store';
import { api } from './api';
import { setError } from '@/store/slices/error';
import { setUserNotValid } from '@/store/slices/user';
const errorHandler = (error: any) => {
  store.dispatch(
    setError({
      message: 'Session expired. Please log in again.',
      status: error.status,
    }),
  );
};

const userErrorHandler = () => {
  store.dispatch(setUserNotValid());
};

api.setErrorHandlers({ errorHandler, userErrorHandler });
