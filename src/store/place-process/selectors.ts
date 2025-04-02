import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const useActiveMarkerSelector = () => useAppSelector((state: Pick<State, NameSpace.Place>) => state.PLACE.activeMarker);
