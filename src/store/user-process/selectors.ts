import { State } from '../../types/state';
import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';

export const useAuthStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.User>) => state.USER.authorizationStatus);
