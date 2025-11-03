'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useIsPublicRoute } from '@/hooks/useIsPublicRoute';
import { useUser } from '@/hooks/useUser';
import { clearError } from '@/store/slices/error';
import '@/styles/globals.css';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@/api/build/setErrorHandler';
import Cookies from 'js-cookie';

export default function ErrorRedirectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const error = useAppSelector(state => state.error);
  const { data, loading, refetching } = useUser();

  const { game } = useAppSelector(state => state.game);
  const { isPublic, pathname } = useIsPublicRoute();
  const dispatch = useAppDispatch();
  const [gameId, setGameId] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = Cookies.get('gameId');
    setGameId(id);
  }, []);
  useEffect(() => {
    if (
      (error.status === 401 ||
        error.status === 403 ||
        (!data && !refetching)) &&
      !loading
    ) {
      if (!isPublic) {
        router.push('/login');
      }

      dispatch(clearError());
    }
  }, [error, data, isPublic, loading, router]);

  const loadingElement = (
    <div className="h-screen w-full">
      <div className="fixed right-1/2 top-[45%]">
        <Spinner color="primary" size="lg" />
      </div>
    </div>
  );
  if (!mounted) {
    return loadingElement;
  }
  if (pathname !== '/game' && gameId && data && game.status === 'ACTIVE') {
    return loadingElement;
  }

  return <>{children}</>;
}
