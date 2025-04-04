import { State } from '../../types';
import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';

export const useAuthStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.User>) => state.USER.authorizationStatus);
export const useLoginStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.User>) => state.USER.loginStatus);
