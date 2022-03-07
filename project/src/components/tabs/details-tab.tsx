import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Fragment } from 'react';
import {Film} from '../../types/film';

dayjs.extend(duration);

type DetailsItemProps = {
  name: string;
  value: string | JSX.Element[] | number;
}

type DetailsTabProps = {
  film: Film;
}

function DetailsItem({name, value}: DetailsItemProps):JSX.Element {
  return(
    <p className="film-card__details-item">
      <strong className="film-card__details-name">{name}</strong>
      <span className="film-card__details-value">{value}</span>
    </p>
  );
}

export default function DetailsTab({film}: DetailsTabProps):JSX.Element {
  const {director, starring, runTime, genre, released} = film;

  const starringList = starring.map((item) => <Fragment key={item}>{item}<br/></Fragment>);

  return(
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <DetailsItem name='Director' value={director}/>
        <DetailsItem name='Starring' value={starringList}/>
      </div>

      <div className="film-card__text-col">
        <DetailsItem name='Run Time' value={dayjs.duration(runTime, 'minutes').format(`${runTime > 60 ? 'H[h] m[m]' : 'm[m]'}`)}/>
        <DetailsItem name='Genre' value={genre}/>
        <DetailsItem name='Released' value={released}/>
      </div>
    </div>
  );
}

