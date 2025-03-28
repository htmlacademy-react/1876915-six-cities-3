import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { State } from '../../types/state';

export const useActiveCityTabSelector = () => useAppSelector((state: Pick<State, NameSpace.Place>) => state.PLACE.activeCity);
