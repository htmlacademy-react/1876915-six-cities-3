import { getCommentCreateStatus, getCommentFetchStatus, getComments } from './comments.selectors';
import { RequestStatus } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { generatePlaceComment } from '../../utils/test/mocks';

describe('Comments selectors', () => {

  const comment = generatePlaceComment();
  const commentId = comment.id;
  const comments = [comment];

  const state = {
    [SliceNameSpace.Comments]: {
      commentsCreateStatus: RequestStatus.Pending,
      commentsFetchStatus: RequestStatus.Fulfilled,
      comments,
    }
  };

  it('should return comments create status', () => {
    const result = getCommentCreateStatus(state);
    expect(result).toBe(RequestStatus.Pending);
  });

  it('should return comments fetch status', () => {
    const result = getCommentFetchStatus(state);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return comments array', () => {
    const result = getComments(state);
    expect(result).toEqual(comments);
    expect(result).toHaveLength(1);
    expect(result[0].id).toEqual(commentId);
  });
});
