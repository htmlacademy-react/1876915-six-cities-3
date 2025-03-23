import { AuthorizationStatus } from '../../const';
import { getReviews } from '../../mocks/reviews';
import { getAuthorizationStatus } from '../../mocks/utils';
import { getCommentDate } from '../../utils/comment';
import PlaceRating from '../place-card/place-rating';
import ReviewForm from './review-form';

export default function Reviews() {

  const reviews = getReviews();

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {reviews.map((review) => {
        const [date, fullDate] = getCommentDate(review.date);

        return (
          <ul className="reviews__list" key={review.id}>
            <li className="reviews__item">
              <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="reviews__avatar user__avatar"
                    src={review.user.avatarUrl}
                    width={54}
                    height={54}
                    alt="Reviews avatar"
                  />
                </div>
                <span className="reviews__user-name">{review.user.name}</span>
              </div>
              <div className="reviews__info">
                <PlaceRating placeRating={review.rating} className={{ rating: 'reviews__rating', stars: 'reviews__stars' }} />
                <p className="reviews__text">{review.comment}</p>
                <time className="reviews__time" dateTime={fullDate}>{date}</time>
              </div>
            </li>
          </ul>
        );
      })}
      {(getAuthorizationStatus() === AuthorizationStatus.Auth) && <ReviewForm />}
    </section>
  );
}
