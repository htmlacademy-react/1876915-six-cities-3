import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import { ChangeFavoritesResponse, CreatePlaceComment, Place, PlaceComment, PlacePreview } from '../types';
import { AppDispatch, State } from '../types';
import { LoggedUser } from '../types';
import { AuthData } from '../types';
import { dropUserData, saveUserData } from './token';
import { redirectAction, userActions } from '../store';

type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchPreviewsAction = createAsyncThunk<PlacePreview[], undefined, ThunkConfig>(
  'data/fetchPreviews',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PlacePreview[]>(ApiRoute.Previews);
    return data;
  },
);

export const fetchFavoritesAction = createAsyncThunk<PlacePreview[], undefined, ThunkConfig>(
  'data/fetchFavoritePreviews',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PlacePreview[]>(ApiRoute.Favorites);
    return data;
  },
);

export const changeFavoriteStatusAction = createAsyncThunk<ChangeFavoritesResponse, { status: boolean; placeId: string }, ThunkConfig>(
  'data/changeFavoriteStatus',
  async ({ status, placeId }, { extra: api }) => {
    const { data } = await api.post<ChangeFavoritesResponse>(`${ApiRoute.Favorites}/${placeId}/${Number(status)}`);
    return data;
  },
);

export const fetchNearbyPreviewsAction = createAsyncThunk<PlacePreview[], string, ThunkConfig>(
  'data/fetchNearbyPreviews',
  async (placeId, { extra: api }) => {
    const { data } = await api.get<PlacePreview[]>(`${ApiRoute.Previews}/${placeId}${ApiRoute.Nearby}`);
    return data;
  },
);

export const fetchPlaceAction = createAsyncThunk<Place, string, ThunkConfig>(
  'data/fetchPlace',
  async (placeId, { extra: api }) => {
    const { data } = await api.get<Place>(`${ApiRoute.Previews}/${placeId}`);
    return data;
  },
);

export const fetchPlaceCommentsAction = createAsyncThunk<PlaceComment[], string, ThunkConfig>(
  'data/fetchPlaceComments',
  async (placeId, { extra: api }) => {
    const { data } = await api.get<PlaceComment[]>(`${ApiRoute.Comments}/${placeId}`);
    return data;
  },
);

export const createCommentAction = createAsyncThunk<PlaceComment, CreatePlaceComment & { placeId: string }, ThunkConfig>(
  'data/createComment',
  async ({ comment, rating, placeId }, { extra: api }) => {
    const { data } = await api.post<PlaceComment>(`${ApiRoute.Comments}/${placeId}`, { comment, rating });
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get<LoggedUser>(ApiRoute.Login);
  },
);

export const loginAction = createAsyncThunk<LoggedUser, AuthData, ThunkConfig>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<LoggedUser>(ApiRoute.Login, { email, password });
    saveUserData(data);
    dispatch(redirectAction(AppRoute.Main));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(ApiRoute.Logout);
    } finally {
      dispatch(userActions.setAuthorizationStatus(AuthorizationStatus.NoAuth));
      dropUserData();
    }
  },
);

