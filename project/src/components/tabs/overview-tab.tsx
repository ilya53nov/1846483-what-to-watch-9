import { Fragment } from 'react';
import {Film} from '../../types/film';

type OverviewTabProps = {
  film: Film;
}

const ratingStringValue = [
  {
    min: 0,
    max: 3,
    stringValue: 'Bad',
  },

  {
    min: 3,
    max: 5,
    stringValue: 'Normal',
  },

  {
    min: 5,
    max: 8,
    stringValue: 'Good',
  },

  {
    min: 8,
    max: 10,
    stringValue: 'Very good',
  },

  {
    min: 10,
    max: Infinity,
    stringValue: 'Awesome',
  },
];

const getRatingStringValue = (rating: number) => {
  const findededRating = ratingStringValue.find((item) => rating >= item.min && rating <= item.max);
  return findededRating?.stringValue;
};

export default function OverviewTab({film}: OverviewTabProps):JSX.Element {
  const {rating, scoresCount, description, director, starring} = film;

  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRatingStringValue(rating)}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{description}</p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {starring.join(', ')}</strong></p>
      </div>
    </Fragment>
  );
}
