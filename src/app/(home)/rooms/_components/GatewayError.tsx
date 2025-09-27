'use client';
import { api } from '@/api/build/api';
import { useDispatchUser } from '@/hooks/useDispatchUser';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const GatewayError = () => {
  useDispatchUser();
  useEffect(() => {
    api.on.error(onError);
    return () => {
      api.off.error(onError);
    };
  }, []);

  const onError = ({ message }: { message: string }) =>
    toast(message, { type: 'warning' });

  return <ToastContainer hideProgressBar closeOnClick closeButton={false} />;
};

export default GatewayError;
