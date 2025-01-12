import { MiddlewareFactory } from '@/types/factory';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export const loginMiddleware: MiddlewareFactory = next => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const hasAccessToken = request.cookies.has('access_token');
    if (!hasAccessToken)
      return NextResponse.redirect(new URL('/login', request.url));
    return next(request, _next);
  };
};
