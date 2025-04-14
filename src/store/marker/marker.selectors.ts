import { SliceNameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const getActiveMarker = (state: Pick<State, SliceNameSpace.Marker>) => state[SliceNameSpace.Marker].activeMarker;
export const useActiveMarkerSelector = () => useAppSelector(getActiveMarker);
