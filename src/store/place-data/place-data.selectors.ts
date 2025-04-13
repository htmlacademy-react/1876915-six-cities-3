import { SliceNameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const useCommentCreateStatusSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].commentsCreateStatus);
export const usePreviewsFetchStatusSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].previewsFetchStatus);
export const useFavoritesFetchStatusSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].favoritesFetchStatus);
export const useChangeFavoritesStatusSelector = (placeId: string) => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].changeFavoriteStatus[placeId]);
export const usePlaceFetchStatusSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].placeFetchStatus);
export const useNearbyFetchStatusSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].nearbyFetchStatus);
export const useCommentsFetchStatusSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].commentsFetchStatus);

export const useCommentsSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].comments);
export const usePreviewsSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].previews);
export const useFavoritesSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].favorites);
export const usePlaceSelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].place);
export const useNearbySelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].nearbyPreviews);
export const useIsFavoriteSelector = (placeId: string) => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => {
  const preview = state[SliceNameSpace.Data].favorites.find((item) => item.id === placeId);
  return preview ? preview.isFavorite : false;
});

export const useIsFavoriteEmptySelector = () => useAppSelector((state: Pick<State, SliceNameSpace.Data>) => state[SliceNameSpace.Data].favorites.length === 0);
