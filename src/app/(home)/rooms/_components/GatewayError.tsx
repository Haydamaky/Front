'use client';

import { socket } from '@/socket';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const GatewayError = () => {
  useEffect(() => {
    socket.on('error', onError);
    return () => {
      socket.off('error', onError);
    };
  }, []);

  const onError = ({ message }: { message: string }) =>
    toast(message, { type: 'warning' });

  return <ToastContainer hideProgressBar closeOnClick closeButton={false} />;
};

export default GatewayError;
