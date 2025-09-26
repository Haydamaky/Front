'use client';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { getUserInfo } from '@/store/slices/user';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '@/styles/globals.css';
import { Spinner } from '@nextui-org/react';
import { match } from 'path-to-regexp';

export default function ErrorRedirectWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const error = useAppSelector(state => state.error);
  const { data, loading } = useAppSelector(state => state.user);
  const router = useRouter();
  const pathname = usePathname();
  const publicPaths = [
    '/login',
    '/signup',
    '/rooms',
    '/',
    '/auth/check-email',
    '/auth/confirm-email/:token',
  ];

  const isPublic = publicPaths.some(path => {
    const matcher = match(path);
    const matched = matcher(pathname);
    return !!matched;
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(getUserInfo());
    }
  }, [dispatch, data]);

  useEffect(() => {
    if ((error.status === 401 || !data) && !isPublic && !loading) {
      router.push('/login');
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
