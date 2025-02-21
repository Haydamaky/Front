import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { stackMiddlewares } from '@/middlewares/stackHandler';
//import { loginMiddleware } from '@/middlewares/login';
import { gameMiddleware } from './middlewares/game';

// add loginMiddleware to the stack
const middlewares = [gameMiddleware];
export default stackMiddlewares(middlewares);

export const config = {
  matcher: ['/rooms', '/game'],
};
