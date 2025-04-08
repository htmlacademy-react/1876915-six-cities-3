import { Fragment } from 'react';
import { RATING_GRADES } from '../../const';
import { UseFormRegister } from 'react-hook-form';
import { Inputs } from './review-form';

type ReviewStarsProps = {
  register: UseFormRegister<Inputs>;
};

export default function ReviewStars({ register }: ReviewStarsProps) {
  return (
    RATING_GRADES.map((grade, gradeIndex) => {
      const index = RATING_GRADES.length - gradeIndex;
      return (
        <Fragment key={grade}>
          <input
            className="form__rating-input visually-hidden"
            {...register('rating')}
            defaultValue={index}
            id={`${index}-stars`}
            type="radio"
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
  );
}
