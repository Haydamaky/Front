'use client';

import { socket } from '@/socket';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const GatewayError = () => {
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
