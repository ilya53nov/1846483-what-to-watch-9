import { ChangeEvent, useState } from 'react';
import RatingStar from './rating-star';

const MAX_RATING = 10;
const MIN_RATING = 1;
const DEFAULT_RATING = 8;
const DEFAULT_COMMENT = '';
//checked
export default function CommentSubmitForm():JSX.Element {
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [comment, setComment] = useState(DEFAULT_COMMENT);

  const ratingStars = [];

  for (let value = MIN_RATING; value <= MAX_RATING; value++) {
    ratingStars.push(value);
  }

  const ratingStarsList = ratingStars.reverse().map((value) => <RatingStar key={value} setState={setRating} value={value} rating={rating} /> );

  const fieldChangeHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = evt.currentTarget;
    setComment(value);
  };

  return(
    <form action="#" className="add-review__form">
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
