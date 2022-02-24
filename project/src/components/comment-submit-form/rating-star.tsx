import { Fragment } from 'react';

type RatingStarProps = {
  value: number;
  rating: number;
  setState: (rating: number) => void;
}

export default function RatingStar({value, rating, setState}: RatingStarProps):JSX.Element {
  return(
    <Fragment>
      <input onChange={() => setState(value)} className="rating__input" id={`star-${value}`} type="radio" name="rating" value={value} checked={value === rating} />
      <label className="rating__label" htmlFor={`star-${value}`}>Rating {value}</label>
    </Fragment>
  );
}
