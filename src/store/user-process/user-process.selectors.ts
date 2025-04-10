import { State } from '../../types';
import { SliceNameSpace } from '../../const';
import { useAppSelector } from '../../hooks';

export const useAuthStatusSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.User>) => state[SliceNameSpace.User].authorizationStatus);
export const useLoginStatusSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.User>) => state[SliceNameSpace.User].loginStatus);
