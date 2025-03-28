import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AppRoute } from '../const';
import { Place, PlacePreview } from '../types/place';
import { AppDispatch, State } from '../types/state';
import { LoggedUser } from '../types/user';
import { AuthData } from '../types/auth-data';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';

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

export const fetchFavoritePreviewsAction = createAsyncThunk<PlacePreview[], undefined, ThunkConfig>(
  'data/fetchFavoritePreviews',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<PlacePreview[]>(ApiRoute.Favorites);
    return data;
  },
);

export const fetchNearbyPreviewsAction = createAsyncThunk<{ placeId: string; previews: PlacePreview[] }, string, ThunkConfig>(
  'data/fetchNearbyPreviews',
  async (placeId, { extra: api }) => {
    const { data } = await api.get<PlacePreview[]>(`${ApiRoute.Previews}/${placeId}${ApiRoute.Nearby}`);
    return { placeId, previews: data };
  },
);

export const fetchOfferAction = createAsyncThunk<Place, string, ThunkConfig>(
  'data/fetchOffer',
  async (placeId, { extra: api }) => {
    const { data } = await api.get<Place>(`${ApiRoute.Previews}/${placeId}`);
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get<LoggedUser>(ApiRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthData, ThunkConfig>(
  'user/login',
  async ({ email: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<LoggedUser>(ApiRoute.Login, { email, password });
    saveToken(token);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, ThunkConfig>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  },
);

