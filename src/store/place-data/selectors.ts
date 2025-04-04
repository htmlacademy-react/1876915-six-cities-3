import { NameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const useCommentCreateStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.commentsCreateStatus);
export const usePreviewsFetchStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.previewsFetchStatus);
export const useFavoritesFetchStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.favoritesFetchStatus);
export const usePlaceFetchStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.placeFetchStatus);
export const useNearbyFetchStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.nearbyFetchStatus);
export const useCommentsFetchStatusSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.commentsFetchStatus);
export const useCommentsSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.comments);
export const usePreviewsSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.previews);
export const useFavoritesSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.favorites);
export const usePlaceSelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.place);
export const useNearbySelector = () => useAppSelector((state: Pick<State, NameSpace.Data>) => state.DATA.nearbyPreviews);
