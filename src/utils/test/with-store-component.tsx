import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import { State } from '../../types';
import { createAPI } from '../../services/api';
import { Action } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { api, redirect } from '../../store';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

type ComponentWithMockStore = {
  withStoreComponent: ReactNode;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(component: ReactNode, initialState: Partial<State> = {},): ComponentWithMockStore {

  const mockAxiosAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api), redirect];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}
