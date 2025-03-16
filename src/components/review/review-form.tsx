import { Fragment, ReactEventHandler, useState } from 'react';
import { MIN_REVIEW_LENGTH } from '../../const';

const ratingGrades = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export default function ReviewForm() {

  const [review, setRatingState] = useState({ rating: 0, review: '' });

  const onChangeHandler: ReactEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ currentTarget: { name, value } }) => {
    setRatingState({ ...review, [name]: value });
  };

  const onFormSubmit: ReactEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          Array.from(ratingGrades, (grade, gradeIndex) => {
            const index = ratingGrades.length - gradeIndex;
            return (
              <Fragment key={grade}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  defaultValue={index}
                  id={`${index}-stars`}
                  type="radio"
                  onClick={onChangeHandler}
                />
                <label
                  htmlFor={`${index}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={grade}
                >
                  <svg className="form__star-image" width={37} height={33}>
                    <use xlinkHref="#icon-star" />
                  </svg>
                </label>
              </Fragment>
            );
          })
        }
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={onChangeHandler}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!review.rating || (review.review.length < MIN_REVIEW_LENGTH)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

