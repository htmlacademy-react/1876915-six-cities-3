import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const usePreviewsLoadingSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.isPreviewsLoading);
export const usePreviewsSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.previews);
export const useFavoritePreviewsSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.favorites);
export const useOfferSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.offer);
export const useNearOffersSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.nearby);
