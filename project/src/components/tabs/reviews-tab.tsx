import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGetCommentsAction } from '../../store/api-actions';
import { Comment } from '../../types/comment';
import { LoadingScreen } from '../loading-screen/loading-screen';

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

export default function ReviewsTab():JSX.Element {
  const params = useParams<string>();

  const filmId = Number(params.id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetCommentsAction(filmId));
  }, [dispatch, filmId]);

  const {data, isLoaded} = useAppSelector((state) => state.film.comments);

  if (!isLoaded) {
    return (
      <LoadingScreen />
    );
  }

  const reviewList = data.map((comment) => <Review key={comment.id} currentComment={comment} />);

  return(
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewList}
      </div>
    </div>
  );
}
