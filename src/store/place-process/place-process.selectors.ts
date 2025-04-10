import { SliceNameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const useActiveMarkerSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Place>) => state[SliceNameSpace.Place].activeMarker);
