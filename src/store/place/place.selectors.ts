import { SliceNameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const getPreviewsFetchStatus = (state: Pick<State, SliceNameSpace.Place>) => state[SliceNameSpace.Place].previewsFetchStatus;
export const getPlaceFetchStatus = (state: Pick<State, SliceNameSpace.Place>) => state[SliceNameSpace.Place].placeFetchStatus;
export const getNearbyFetchStatus = (state: Pick<State, SliceNameSpace.Place>) => state[SliceNameSpace.Place].nearbyFetchStatus;
export const getPreviews = (state: Pick<State, SliceNameSpace.Place>) => state[SliceNameSpace.Place].previews;
export const getPlace = (state: Pick<State, SliceNameSpace.Place>) => state[SliceNameSpace.Place].place;
export const getNearby = (state: Pick<State, SliceNameSpace.Place>) => state[SliceNameSpace.Place].nearbyPreviews;


export const usePreviewsFetchStatusSelector = () => useAppSelector(getPreviewsFetchStatus);
export const usePlaceFetchStatusSelector = () => useAppSelector(getPlaceFetchStatus);
export const useNearbyFetchStatusSelector = () => useAppSelector(getNearbyFetchStatus);

export const usePreviewsSelector = () => useAppSelector(getPreviews);
export const usePlaceSelector = () => useAppSelector(getPlace);
export const useNearbySelector = () => useAppSelector(getNearby);
