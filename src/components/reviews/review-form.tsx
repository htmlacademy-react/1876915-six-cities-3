import { USER_COMMENT_MAX_LENGTH, USER_COMMENT_MIN_LENGTH, MIN_PLACE_RATING } from '../../const';
import ReviewStars from './review-stars';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useActionCreators } from '../../hooks';
import { RequestStatus } from '../../types';
import { useEffect } from 'react';
import { commentActions, useCommentCreateStatusSelector } from '../../store';

export type Inputs = {
  comment: string;
  rating: number;
}

type ReviewFormProps = {
  placeId: string;
}

export default function ReviewForm({ placeId }: ReviewFormProps) {

  const { register, handleSubmit, formState: { isValid }, reset, watch } = useForm<Inputs>({ defaultValues: { comment: '', rating: 0 } });
  const { createCommentAction } = useActionCreators(commentActions);
  const status = useCommentCreateStatusSelector();
  const isSubmitting = (status === RequestStatus.Pending);

  useEffect(() => {
    if (status === RequestStatus.Fulfilled) {
      reset();
    }
  }, [reset, status]);

  const onFormSubmit: SubmitHandler<Inputs> = ({ comment, rating }) => {
    createCommentAction({ comment, rating: +rating, placeId });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={(evt) => void handleSubmit(onFormSubmit)(evt)} data-testid="review-form">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <ReviewStars register={register} />
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        {...register('comment', {
          required: true,
          minLength: USER_COMMENT_MIN_LENGTH,
          maxLength: USER_COMMENT_MAX_LENGTH,
        })}
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        disabled={isSubmitting}
        data-testid="review-textarea"
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
          disabled={!isValid || isSubmitting || (watch('rating') < MIN_PLACE_RATING)}
          data-testid="review-submit-button"
        >
          {isSubmitting ? '...Submitting' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

