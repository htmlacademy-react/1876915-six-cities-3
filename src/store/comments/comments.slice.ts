import { createSlice } from '@reduxjs/toolkit';
import { SliceNameSpace } from '../../const';
import { CommentsState, RequestStatus } from '../../types';
import { createCommentAction, fetchPlaceCommentsAction } from '../../services/api-actions';

const initialState: CommentsState = {
  commentsFetchStatus: RequestStatus.Fulfilled,
  commentsCreateStatus: RequestStatus.Fulfilled,
  comments: [],
};

export const commentSlice = createSlice({
  name: SliceNameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlaceCommentsAction.fulfilled, (state, { payload }) => {
        state.comments = payload;
        state.commentsFetchStatus = RequestStatus.Fulfilled;
      })
      .addCase(fetchPlaceCommentsAction.pending, (state) => {
        state.commentsFetchStatus = RequestStatus.Pending;
      })
      .addCase(fetchPlaceCommentsAction.rejected, (state) => {
        state.commentsFetchStatus = RequestStatus.Rejected;
      })
      .addCase(createCommentAction.fulfilled, (state, { payload }) => {
        state.comments.push(payload);
        state.commentsCreateStatus = RequestStatus.Fulfilled;
      })
      .addCase(createCommentAction.pending, (state) => {
        state.commentsCreateStatus = RequestStatus.Pending;
      })
      .addCase(createCommentAction.rejected, (state) => {
        state.commentsCreateStatus = RequestStatus.Rejected;
      });
  },
});

export const commentActions = {
  ...commentSlice.actions,
  fetchPlaceCommentsAction,
  createCommentAction,
};

export const commentsReducer = commentSlice.reducer;
