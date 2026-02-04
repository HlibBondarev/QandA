export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://qanda-net-8-drdkb4axfqcdd6gr.canadacentral-01.azurewebsites.net'
    : process.env.REACT_APP_ENV === 'staging'
      ? 'https://qanda-net-8-staging-gzhae2brbadrgua6.canadacentral-01.azurewebsites.net'
      : 'https://localhost:5001';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-qjg8tcy86dt7zrfv.us.auth0.com',
  clientId: '5S1RtjB0SgnvKlMaHujF8PMnYnGdiIgj',
  authorizationParams: {
    redirect_uri: window.location.origin + '/signin-callback',
    scope: 'openid profile QandAAPI email',
    audience: 'https://qanda',
  },
  cacheLocation: 'localstorage',
  useRefreshTokens: true,
} as const;
