import { getCommentCreateStatus, getCommentFetchStatus, getComments } from './comments.selectors';
import { RequestStatus } from '../../types/state';
import { SliceNameSpace } from '../../const';
import { PlaceComment } from '../../types/comment';
import { faker } from '@faker-js/faker';

describe('Comments selectors', () => {
  const mockState = {
    [SliceNameSpace.Comments]: {
      commentsCreateStatus: RequestStatus.Pending,
      commentsFetchStatus: RequestStatus.Fulfilled,
      comments: [
        {
          id: faker.string.uuid(),
          date: faker.date.recent().toISOString(),
          user: {
            name: faker.person.fullName(),
            avatarUrl: faker.image.avatar(),
            isPro: faker.datatype.boolean()
          },
          comment: faker.lorem.paragraph(),
          rating: faker.number.int({ min: 1, max: 5 })
        }
      ] as PlaceComment[]
    }
  };

  it('should return comments create status', () => {
    const result = getCommentCreateStatus(mockState);
    expect(result).toBe(RequestStatus.Pending);
  });

  it('should return comments fetch status', () => {
    const result = getCommentFetchStatus(mockState);
    expect(result).toBe(RequestStatus.Fulfilled);
  });

  it('should return comments array', () => {
    const result = getComments(mockState);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBeDefined();
    expect(result[0].user.name).toBeDefined();
  });
});
