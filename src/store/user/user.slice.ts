import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';
import { SliceNameSpace } from '../../const';
import { RequestStatus, UserState } from '../../types';
import { checkAuthAction, loginAction, logoutAction } from '../../services/api-actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  loginStatus: RequestStatus.Fulfilled,
};

const userSlice = createSlice({
  name: SliceNameSpace.User,
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
        state.loginStatus = RequestStatus.Pending;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});

export const userActions = { ...userSlice.actions, checkAuthAction, loginAction, logoutAction };
export const userReducer = userSlice.reducer;
