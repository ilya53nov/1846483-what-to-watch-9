import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_COMMENT, DEFAULT_RATING, MAX_RATING, MIN_RATING } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addComment } from '../../store/api-actions';
import { getIsDisabledForm } from '../../store/app-process/selectors';
import { CommentData } from '../../types/comment-data';
import ErrorMessage from '../error-message/error-message';
import RatingStar from './rating-star';

export default function CommentSubmitForm():JSX.Element {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [comment, setComment] = useState(DEFAULT_COMMENT);
  const [isDisabled, setIsDisabled] = useState(true);

  const params = useParams();

  const filmId = Number(params.id);

  const dispatch = useAppDispatch();

  const isDisabledForm = useAppSelector(getIsDisabledForm);

  const ratingStars = [];

  for (let value = MIN_RATING; value <= MAX_RATING; value++) {
    ratingStars.push(value);
  }

  const ratingStarsList = ratingStars.reverse().map((value) => <RatingStar key={value} setRating={setRating} value={value} rating={rating} /> );

  const fieldChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = evt.currentTarget;
    setComment(value);

    if (comment.length > 50 && comment.length < 400) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onSubmit = (commentData: CommentData) => {
    dispatch(addComment(commentData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (comment) {
      onSubmit({comment: comment, rating: rating, filmId: filmId});
    }

  };

  return(
    <form action="#" onSubmit={handleSubmit} className="add-review__form">
      <ErrorMessage />
      <div aria-disabled={isDisabledForm} className="rating">
        <div className="rating__stars">
          {ratingStarsList}
        </div>
      </div>

      <div className="add-review__text">
        <textarea disabled={isDisabledForm && isDisabled} onChange={fieldChangeHandler} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={comment}></textarea>
        <div className="add-review__submit">
          <button disabled={isDisabledForm || isDisabled } className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}
