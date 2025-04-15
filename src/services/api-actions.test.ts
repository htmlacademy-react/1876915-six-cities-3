import MockAdapter from 'axios-mock-adapter';
import { faker } from '@faker-js/faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { StatusCodes } from 'http-status-codes';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { ApiRoute } from '../const';
import { createAPI } from '../services/api';
import * as tokenStorage from '../services/token';
import { api, redirectAction, userActions } from '../store';
import { State } from '../types/state';
import { AuthData, LoggedUser, Place, PlacePreview } from '../types';
import { extractActionsTypes, generatePlace, generatePlaceComment, generatePlacePreview } from '../utils/test/mocks';
import { fetchPreviewsAction, fetchFavoritesAction, changeFavoriteStatusAction, fetchNearbyPreviewsAction, fetchPlaceAction, fetchPlaceCommentsAction, createCommentAction } from './api-actions';

describe('Async actions', () => {
  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<State, Action<string>, ThunkDispatch<State, ReturnType<typeof createAPI>, Action>>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('User slice actions', () => {
    const { checkAuthAction, loginAction, logoutAction, setAuthorizationStatus } = userActions;
    const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
    const fakeServerReplay: LoggedUser = {
      token: 'secret',
      name: 'John',
      avatarUrl: 'avatar.jpg',
      isPro: false,
      email: 'test@test.ru'
    };

    describe('checkAuthAction', () => {
      it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
        mockAxiosAdapter.onGet(ApiRoute.Login).reply(StatusCodes.OK);

        await store.dispatch(checkAuthAction());
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          checkAuthAction.pending.type,
          checkAuthAction.fulfilled.type,
        ]);
      });

      it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(ApiRoute.Login).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(checkAuthAction());
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          checkAuthAction.pending.type,
          checkAuthAction.rejected.type,
        ]);
      });
    });

    describe('loginAction', () => {
      it('should dispatch "loginAction.pending", "redirectAction", "loginAction.fulfilled" when server response 200', async () => {
        mockAxiosAdapter.onPost(ApiRoute.Login).reply(StatusCodes.OK, fakeServerReplay);

        await store.dispatch(loginAction(fakeUser));
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          loginAction.pending.type,
          redirectAction.type,
          loginAction.fulfilled.type,
        ]);
      });

      it('should call "saveToken" once with the received token', async () => {
        mockAxiosAdapter.onPost(ApiRoute.Login).reply(StatusCodes.OK, fakeServerReplay);
        const mockSaveToken = vi.spyOn(tokenStorage, 'saveUserData');

        await store.dispatch(loginAction(fakeUser));

        expect(mockSaveToken).toHaveBeenCalledTimes(1);
        expect(mockSaveToken).toHaveBeenCalledWith(fakeServerReplay);
      });
    });

    describe('logoutAction', () => {
      it('should dispatch "logoutAction.pending", "setAuthorizationStatus", "logoutAction.fulfilled" when server response 204', async () => {
        mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(StatusCodes.NO_CONTENT);

        await store.dispatch(logoutAction());
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          logoutAction.pending.type,
          setAuthorizationStatus.type,
          logoutAction.fulfilled.type,
        ]);
      });

      it('should call "dropToken" with "logoutAction"', async () => {
        mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(StatusCodes.NO_CONTENT);
        const mockDropToken = vi.spyOn(tokenStorage, 'dropUserData');

        await store.dispatch(logoutAction());

        expect(mockDropToken).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Place slice actions', () => {

    const mockPlace: Place = generatePlace();
    const mockPreviews: PlacePreview[] = [generatePlacePreview()];
    const mockNearby = [generatePlacePreview()];

    describe('fetchPreviewsAction', () => {
      it('should dispatch "fetchPreviewsAction.pending" and "fetchPreviewsAction.fulfilled" when server response 200', async () => {
        mockAxiosAdapter.onGet(ApiRoute.Previews).reply(StatusCodes.OK, mockPreviews);

        await store.dispatch(fetchPreviewsAction());
        const actions = store.getActions();
        const actionTypes = extractActionsTypes(actions);
        const actionFulfilled = actions.find((action) => action.type === fetchPreviewsAction.fulfilled.type) as ReturnType<typeof fetchPreviewsAction.fulfilled>;

        expect(actionTypes).toEqual([
          fetchPreviewsAction.pending.type,
          fetchPreviewsAction.fulfilled.type,
        ]);

        expect(actionFulfilled.payload).toEqual(mockPreviews);
      });

      it('should dispatch "fetchPreviewsAction.pending" and "fetchPreviewsAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(ApiRoute.Previews).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(fetchPreviewsAction());
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          fetchPreviewsAction.pending.type,
          fetchPreviewsAction.rejected.type,
        ]);
      });
    });

    describe('fetchPlaceAction', () => {
      it('should dispatch "fetchPlaceAction.pending" and "fetchPlaceAction.fulfilled" when server response 200', async () => {
        mockAxiosAdapter.onGet(`${ApiRoute.Previews}/${mockPlace.id}`).reply(StatusCodes.OK, mockPlace);

        await store.dispatch(fetchPlaceAction(mockPlace.id));
        const actions = store.getActions();
        const actionTypes = extractActionsTypes(actions);
        const actionFulfilled = actions.find((action) => action.type === fetchPlaceAction.fulfilled.type) as ReturnType<typeof fetchPlaceAction.fulfilled>;

        expect(actionTypes).toEqual([
          fetchPlaceAction.pending.type,
          fetchPlaceAction.fulfilled.type,
        ]);

        expect(actionFulfilled.payload).toEqual(mockPlace);
      });

      it('should dispatch "fetchPlaceAction.pending" and "fetchPlaceAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(`${ApiRoute.Previews}/${mockPlace.id}`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(fetchPlaceAction(mockPlace.id));
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          fetchPlaceAction.pending.type,
          fetchPlaceAction.rejected.type,
        ]);
      });
    });

    describe('fetchNearbyPreviewsAction', () => {
      it('should dispatch "fetchNearbyPreviewsAction.pending" and "fetchNearbyPreviewsAction.fulfilled" when server response 200', async () => {
        mockAxiosAdapter.onGet(`${ApiRoute.Previews}/${mockPlace.id}${ApiRoute.Nearby}`).reply(StatusCodes.OK, mockNearby);

        await store.dispatch(fetchNearbyPreviewsAction(mockPlace.id));
        const actions = store.getActions();
        const actionTypes = extractActionsTypes(actions);
        const actionFulfilled = actions.find((action) => action.type === fetchNearbyPreviewsAction.fulfilled.type) as ReturnType<typeof fetchNearbyPreviewsAction.fulfilled>;

        expect(actionTypes).toEqual([
          fetchNearbyPreviewsAction.pending.type,
          fetchNearbyPreviewsAction.fulfilled.type,
        ]);

        expect(actionFulfilled.payload).toEqual(mockNearby);
      });

      it('should dispatch "fetchNearbyPreviewsAction.pending" and "fetchNearbyPreviewsAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(`${ApiRoute.Previews}/${mockPlace.id}${ApiRoute.Nearby}`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(fetchNearbyPreviewsAction(mockPlace.id));
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          fetchNearbyPreviewsAction.pending.type,
          fetchNearbyPreviewsAction.rejected.type,
        ]);
      });
    });
  });

  describe('Comments slice actions', () => {

    const placeId = faker.string.uuid();
    const mockComment = generatePlaceComment();


    describe('fetchPlaceCommentsAction', () => {
      it('should dispatch "fetchPlaceCommentsAction.pending" and "fetchPlaceCommentsAction.fulfilled" when server response 200', async () => {
        const mockComments = [mockComment];
        mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${placeId}`).reply(StatusCodes.OK, mockComments);

        await store.dispatch(fetchPlaceCommentsAction(placeId));
        const actions = store.getActions();
        const actionTypes = extractActionsTypes(actions);
        const actionFulfilled = actions.find((action) => action.type === fetchPlaceCommentsAction.fulfilled.type) as ReturnType<typeof fetchPlaceCommentsAction.fulfilled>;

        expect(actionTypes).toEqual([
          fetchPlaceCommentsAction.pending.type,
          fetchPlaceCommentsAction.fulfilled.type,
        ]);

        expect(actionFulfilled.payload).toEqual(mockComments);
      });

      it('should dispatch "fetchPlaceCommentsAction.pending" and "fetchPlaceCommentsAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${placeId}`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(fetchPlaceCommentsAction(placeId));
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          fetchPlaceCommentsAction.pending.type,
          fetchPlaceCommentsAction.rejected.type,
        ]);
      });
    });

    describe('createCommentAction', () => {
      it('should dispatch "createCommentAction.pending" and "createCommentAction.fulfilled" when server response 200', async () => {
        mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${placeId}`).reply(StatusCodes.OK, mockComment);

        await store.dispatch(createCommentAction({ comment: mockComment.comment, rating: mockComment.rating, placeId }));
        const actions = store.getActions();
        const actionTypes = extractActionsTypes(actions);
        const actionFulfilled = actions.find((action) => action.type === createCommentAction.fulfilled.type) as ReturnType<typeof createCommentAction.fulfilled>;

        expect(actionTypes).toEqual([
          createCommentAction.pending.type,
          createCommentAction.fulfilled.type,
        ]);

        expect(actionFulfilled.payload).toEqual(mockComment);
      });

      it('should dispatch "createCommentAction.pending" and "createCommentAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${placeId}`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(createCommentAction({ comment: mockComment.comment, rating: mockComment.rating, placeId }));
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          createCommentAction.pending.type,
          createCommentAction.rejected.type,
        ]);
      });
    });
  });

  describe('Favorites slice actions', () => {

    const placeId = faker.string.uuid();

    describe('fetchFavoritesAction', () => {
      it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" when server response 200', async () => {
        const mockFavorites = [generatePlacePreview()];
        mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(StatusCodes.OK, mockFavorites);

        await store.dispatch(fetchFavoritesAction());
        const actions = store.getActions();
        const actionTypes = extractActionsTypes(actions);
        const actionFulfilled = actions.find((action) => action.type === fetchFavoritesAction.fulfilled.type) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

        expect(actionTypes).toEqual([
          fetchFavoritesAction.pending.type,
          fetchFavoritesAction.fulfilled.type,
        ]);

        expect(actionFulfilled.payload).toEqual(mockFavorites);
      });

      it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(fetchFavoritesAction());
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          fetchFavoritesAction.pending.type,
          fetchFavoritesAction.rejected.type,
        ]);
      });
    });

    describe('changeFavoriteStatusAction', () => {
      it('should dispatch "changeFavoriteStatusAction.pending" and "changeFavoriteStatusAction.fulfilled" when server response 200', async () => {
        const mockResponse = { isFavorite: true };
        mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${placeId}/1`).reply(StatusCodes.OK, mockResponse);

        await store.dispatch(changeFavoriteStatusAction({ status: true, placeId }));
        const actions = store.getActions();
        const actionTypes = extractActionsTypes(actions);
        const actionFulfilled = actions.find((action) => action.type === changeFavoriteStatusAction.fulfilled.type) as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;

        expect(actionTypes).toEqual([
          changeFavoriteStatusAction.pending.type,
          changeFavoriteStatusAction.fulfilled.type,
        ]);

        expect(actionFulfilled.payload).toEqual(mockResponse);
      });

      it('should dispatch "changeFavoriteStatusAction.pending" and "changeFavoriteStatusAction.rejected" when server response 400', async () => {
        mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${placeId}/1`).reply(StatusCodes.BAD_REQUEST);

        await store.dispatch(changeFavoriteStatusAction({ status: true, placeId }));
        const actionTypes = extractActionsTypes(store.getActions());

        expect(actionTypes).toEqual([
          changeFavoriteStatusAction.pending.type,
          changeFavoriteStatusAction.rejected.type,
        ]);
      });
    });
  });
});

