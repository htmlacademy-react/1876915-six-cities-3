import { SliceNameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const getFavoritesFetchStatus = (state: Pick<State, SliceNameSpace.Favorites>) => state[SliceNameSpace.Favorites].favoritesFetchStatus;
export const getFavoritesChangeStatus = (placeId: string) => (state: Pick<State, SliceNameSpace.Favorites>) => state[SliceNameSpace.Favorites].changeFavoriteStatus[placeId];
export const getFavorites = (state: Pick<State, SliceNameSpace.Favorites>) => state[SliceNameSpace.Favorites].favorites;
export const getIsFavoritesEmptyFlag = (state: Pick<State, SliceNameSpace.Favorites>) => state[SliceNameSpace.Favorites].favorites.length === 0;
export const getIsFavoriteFlag = (placeId: string) => (state: Pick<State, SliceNameSpace.Favorites>) => {
  const preview = state[SliceNameSpace.Favorites].favorites.find((item) => item.id === placeId);
  return preview ? preview.isFavorite : false;
};

export const useFavoritesFetchStatusSelector = () => useAppSelector(getFavoritesFetchStatus);
export const useFavoritesChangeStatusSelector = (placeId: string) => useAppSelector(getFavoritesChangeStatus(placeId));
export const useFavoritesSelector = () => useAppSelector(getFavorites);
export const useIsFavoriteSelector = (placeId: string) => useAppSelector(getIsFavoriteFlag(placeId));
export const useIsFavoritesEmptySelector = () => useAppSelector(getIsFavoritesEmptyFlag);
