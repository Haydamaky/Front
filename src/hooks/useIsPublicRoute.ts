'use client';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';

export function useIsPublicRoute() {
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
  return { isPublic };
}
