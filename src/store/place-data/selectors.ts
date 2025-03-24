import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks/use-app-selector';
import { State } from '../../types/state';

export const usePreviewsSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.previews);
export const useFavoritePreviewsSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.favorites);
export const useOfferSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.offer);
export const useNearOffersSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.nearby);
