import { MiddlewareFactory } from '@/types/factory';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const gameMiddleware: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const hasActiveGame = request.cookies.has('gameId');
    const pathName = request.nextUrl.pathname;

    if (!hasActiveGame && pathName === '/game')
      return NextResponse.redirect(new URL('/rooms', request.url));
    return next(request, _next);
  };
};
