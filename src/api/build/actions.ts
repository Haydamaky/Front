export const actions = [
  {
    name: 'confirmEmail',
    method: 'get',
    path: `auth/confirm-email`,
    pathParameter: true,
  },
  {
    name: 'setGameCookie',
    method: 'post',
    path: 'game/set-cookie',
    pathParameter: false,
  },
  {
    name: 'signin',
    method: 'post',
    path: 'auth/local/signin',
    pathParameter: false,
  },
  {
    name: 'signup',
    method: 'post',
    path: 'auth/local/signup',
    pathParameter: false,
  },
  {
    name: 'getUserInfo',
    method: 'get',
    path: 'auth/local/me',
    pathParameter: false,
  },
] as const;

export type ActionNames = (typeof actions)[number]['name'];
