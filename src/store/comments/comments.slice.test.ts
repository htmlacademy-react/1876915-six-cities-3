import { CommentsState, RequestStatus } from '../../types/state';
import { commentsReducer } from '../index';
import { fetchPlaceCommentsAction, createCommentAction } from '../../services/api-actions';
import { generatePlaceComment } from '../../utils/test/mocks';

describe('Comments slice', () => {

  const comment = generatePlaceComment();

  const initialState: CommentsState = {
    comments: [],
    commentsFetchStatus: RequestStatus.Fulfilled,
    commentsCreateStatus: RequestStatus.Fulfilled,
  };

  it('should return initial state', () => {
    const result = commentsReducer(undefined, { type: '' });
    expect(result).toEqual(initialState);
  });

  it('should handle fetchPlaceCommentsAction.pending', () => {
    const result = commentsReducer(initialState, fetchPlaceCommentsAction.pending);
    expect(result.commentsFetchStatus).toBe(RequestStatus.Pending);
  });

  it('should handle fetchPlaceCommentsAction.fulfilled', () => {
    const comments = [comment];
    const result = commentsReducer(initialState, fetchPlaceCommentsAction.fulfilled(comments, '', ''));
    expect(result.comments).toEqual(comments);
    expect(result.commentsFetchStatus).toBe(RequestStatus.Fulfilled);
  });

  it('should handle fetchPlaceCommentsAction.rejected', () => {
    const result = commentsReducer(initialState, fetchPlaceCommentsAction.rejected(null, '', ''));
    expect(result.commentsFetchStatus).toBe(RequestStatus.Rejected);
  });

  it('should handle createCommentAction.pending', () => {
    const result = commentsReducer(initialState, createCommentAction.pending('', { placeId: '', comment: '', rating: 0 }));
    expect(result.commentsCreateStatus).toBe(RequestStatus.Pending);
  });

  it('should handle createCommentAction.fulfilled', () => {
    const result = commentsReducer(initialState, createCommentAction.fulfilled(comment, '', { placeId: '', comment: '', rating: 0 }));
    expect(result.comments).toEqual([comment]);
    expect(result.commentsCreateStatus).toBe(RequestStatus.Fulfilled);
  });

  it('should handle createCommentAction.rejected', () => {
    const result = commentsReducer(initialState, createCommentAction.rejected(null, '', { placeId: '', comment: '', rating: 0 }));
    expect(result.commentsCreateStatus).toBe(RequestStatus.Rejected);
  });
});

