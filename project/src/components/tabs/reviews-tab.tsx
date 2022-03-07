import dayjs from 'dayjs';
import { Comment } from '../../types/comment';


type ReviewsTabProps = {
  comments: Comment[];

}

type ReviewProps = {
  currentComment: Comment;
}

function Review({currentComment}: ReviewProps):JSX.Element {
  const {user, rating, comment, date} = currentComment;
  const {name} = user;

  return(
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{name}</cite>

          <time className="review__date" dateTime={dayjs(date).format('YYYY-MM-DD') }>{dayjs(date).format('MMMM DD, YYYY') }</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

function ReviewList({comments}: ReviewsTabProps):JSX.Element {
  const reviewList = comments.map((comment) => <Review key={comment.id} currentComment={comment} />);

  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewList}
      </div>
    </div>
  );
}

export default function ReviewsTab({comments}: ReviewsTabProps):JSX.Element {
  return(
    <ReviewList comments={comments}/>
  );
}
