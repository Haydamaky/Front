'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useIsPublicRoute } from '@/hooks/useIsPublicRoute';
import { useUser } from '@/hooks/useUser';
import { clearError } from '@/store/slices/error';
import '@/styles/globals.css';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '@/api/build/setErrorHandler';

export default function ErrorRedirectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const error = useAppSelector(state => state.error);
  const { data, loading, refetching } = useUser();
  const { isPublic } = useIsPublicRoute();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      (error.status === 401 || (!data && !refetching)) &&
      !isPublic &&
      !loading
    ) {
      router.push('/login');
      dispatch(clearError());
    }
  }, [error, data, isPublic, loading, router]);

  if (!data && !isPublic) {
    return (
      <div className="h-screen w-full">
        <div className="fixed right-1/2 top-[45%]">
          <Spinner color="primary" size="lg" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
