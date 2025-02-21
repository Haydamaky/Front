// import { MiddlewareFactory } from '@/types/factory';
// import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

// export const loginMiddleware: MiddlewareFactory = next => {
//   return async (request: NextRequest, _next: NextFetchEvent) => {
//     const cookies = request.headers.get('cookie');
//     const hasAccessToken = cookies?.includes('access_token=');
//     console.log('hasAccessToken:', hasAccessToken);
//     console.log('cookies:', cookies);
//     if (!hasAccessToken) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     return next(request, _next);
//   };
// };
