import { State } from '../../types';
import { SliceNameSpace } from '../../const';
import { useAppSelector } from '../../hooks';

export const getAuthStatus = (state: Pick<State, SliceNameSpace.User>) => state[SliceNameSpace.User].authorizationStatus;
export const getLoginStatus = (state: Pick<State, SliceNameSpace.User>) => state[SliceNameSpace.User].loginStatus;

export const useAuthStatusSelector = () => useAppSelector(getAuthStatus);
export const useLoginStatusSelector = () => useAppSelector(getLoginStatus);
