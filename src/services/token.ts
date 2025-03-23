
const USER_TOKEN_KEY_NAME = 'user-token';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(USER_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (token: Token): void => {
  localStorage.setItem(USER_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(USER_TOKEN_KEY_NAME);
};
