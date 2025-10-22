'use client';
import { api } from '@/api/build/api';
import { useDispatchUser } from '@/hooks/useDispatchUser';
import useRedirectIfActiveGame from '@/hooks/useRedirectIfActiveGame';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const GatewayError = () => {
  useDispatchUser();
  useRedirectIfActiveGame();
  const router = useRouter();
  useEffect(() => {
    const onError = (error: { message: string; code?: string }) => {
      if (error.code === 'USER_NOT_IN_GAME') {
        router.push('/rooms');
      }
      if (error.code === 'USER_NOT_AUTHENTICATED') {
        router.push('/login');
      }
      toast(error.message, { type: 'warning' });
    };
    api.on.error(onError);
    return () => {
      api.off.error(onError);
    };
  }, []);

  return <ToastContainer hideProgressBar closeOnClick closeButton={false} />;
};

export default GatewayError;
