import { RequestStatus } from '../../types';
import { PlaceState } from '../../types';
import { generatePlace, generatePlacePreview } from '../../utils/test/mocks';
import { placeActions, placeReducer } from '../index';

describe('Place slice', () => {

  const mockedPlace = generatePlace();
  const mockedPlacePreview = generatePlacePreview();

  const initialState: PlaceState = {
    previewsFetchStatus: RequestStatus.Pending,
    placeFetchStatus: RequestStatus.Fulfilled,
    nearbyFetchStatus: RequestStatus.Fulfilled,
    previews: [],
    place: null,
    nearbyPreviews: []
  };

  it('should return initial state', () => {
    const result = placeReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle fetchPreviewsAction.fulfilled', () => {

    const expectedState = {
      ...initialState,
      previewsFetchStatus: RequestStatus.Fulfilled,
      previews: [mockedPlacePreview]
    };

    const result = placeReducer(undefined, placeActions.fetchPreviewsAction.fulfilled([mockedPlacePreview], '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should handle fetchPreviewsAction.pending', () => {
    const expectedState = {
      ...initialState,
      previewsFetchStatus: RequestStatus.Pending,
    };

    const result = placeReducer(undefined, placeActions.fetchPreviewsAction.pending);
    expect(result).toEqual(expectedState);
  });

  it('should handle fetchPreviewsAction.rejected', () => {
    const expectedState = {
      ...initialState,
      previewsFetchStatus: RequestStatus.Rejected,
    };

    const result = placeReducer(undefined, placeActions.fetchPreviewsAction.rejected(null, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it('should handle fetchPlaceAction.fulfilled', () => {
    const expectedState = {
      ...initialState,
      placeFetchStatus: RequestStatus.Fulfilled,
      place: mockedPlace
    };

    const result = placeReducer(undefined, placeActions.fetchPlaceAction.fulfilled(mockedPlace, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should handle fetchPlaceAction.pending', () => {
    const expectedState = {
      ...initialState,
      placeFetchStatus: RequestStatus.Pending,
    };

    const result = placeReducer(undefined, placeActions.fetchPlaceAction.pending('', ''));
    expect(result).toEqual(expectedState);
  });

  it('should handle fetchPlaceAction.rejected', () => {
    const expectedState = {
      ...initialState,
      placeFetchStatus: RequestStatus.Rejected,
    };

    const result = placeReducer(undefined, placeActions.fetchPlaceAction.rejected(null, '', ''));
    expect(result).toEqual(expectedState);
  });

  it('should handle fetchNearbyPreviewsAction.fulfilled', () => {
    const expectedState = {
      ...initialState,
      nearbyFetchStatus: RequestStatus.Fulfilled,
      nearbyPreviews: [mockedPlacePreview]
    };

    const result = placeReducer(undefined, placeActions.fetchNearbyPreviewsAction.fulfilled([mockedPlacePreview], '', ''));
    expect(result).toEqual(expectedState);
  });
});
