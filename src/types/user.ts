export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type LoggedUser = User & {
  email: string;
  token: string;
}
