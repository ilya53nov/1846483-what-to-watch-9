import { ChangeEvent, FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DEFAULT_COMMENT, DEFAULT_RATING, MAX_RATING, MIN_RATING } from '../../const';
import { useAppDispatch } from '../../hooks';
import { addComment } from '../../store/api-actions';
import { CommentData } from '../../types/comment-data';
import RatingStar from './rating-star';

export default function CommentSubmitForm():JSX.Element {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [comment, setComment] = useState(DEFAULT_COMMENT);

  const params = useParams();

  const filmId = Number(params.id);

  const dispatch = useAppDispatch();

  const ratingStars = [];

  for (let value = MIN_RATING; value <= MAX_RATING; value++) {
    ratingStars.push(value);
  }

  const ratingStarsList = ratingStars.reverse().map((value) => <RatingStar key={value} setRating={setRating} value={value} rating={rating} /> );

  const fieldChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = evt.currentTarget;
    setComment(value);
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
      <div className="rating">
        <div className="rating__stars">
          {ratingStarsList}
        </div>
      </div>

      <div className="add-review__text">
        <textarea onChange={fieldChangeHandler} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={comment}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit">Post</button>
        </div>

      </div>
    </form>
  );
}
