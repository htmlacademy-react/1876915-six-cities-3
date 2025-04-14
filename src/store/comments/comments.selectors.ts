import { SliceNameSpace } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types';

export const getCommentCreateStatus = (state: Pick<State, SliceNameSpace.Comments>) => state[SliceNameSpace.Comments].commentsCreateStatus;
export const getCommentFetchStatus = (state: Pick<State, SliceNameSpace.Comments>) => state[SliceNameSpace.Comments].commentsFetchStatus;
export const getComments = (state: Pick<State, SliceNameSpace.Comments>) => state[SliceNameSpace.Comments].comments;

export const useCommentCreateStatusSelector = () => useAppSelector(getCommentCreateStatus);
export const useCommentsFetchStatusSelector = () => useAppSelector(getCommentFetchStatus);
export const useCommentsSelector = () => useAppSelector(getComments);
