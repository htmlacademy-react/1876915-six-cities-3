import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { RequestStatus, UserProcess } from '../../types';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loginStatus: RequestStatus.Fulfilled,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.loginStatus = RequestStatus.Fulfilled;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.loginStatus = RequestStatus.Rejected;
      })
      .addCase(loginAction.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.loginStatus = RequestStatus.Pending;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const userProcessActions = { ...userProcess.actions, checkAuthAction, loginAction, logoutAction };
