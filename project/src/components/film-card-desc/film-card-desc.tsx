import { memo, ReactNode, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { changeStatusToView } from '../../store/api-actions';
import { Film } from '../../types/film';
import { FilmStatus } from '../../types/film-status';

type FilmCardDescProps = {
  film: Film;
  children?: ReactNode;
}

function FilmCardDesc({film, children}: FilmCardDescProps):JSX.Element {
  const {name, genre, released, id, isFavorite} = film;

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const handleClickPlayButton = (evt: SyntheticEvent) => {
    evt.preventDefault();

    navigate(`/player/${id}`);
  };

  const changeFilmStatus = (filmStatus: FilmStatus) => {
    dispatch(changeStatusToView(filmStatus));
  };

  const handleClickMyListButton = (evt: SyntheticEvent) => {
    evt.preventDefault();

    const status = isFavorite ? 0 : 1;

    changeFilmStatus({filmId: id, status: status});
  };

  return(
    <div className="film-card__desc">
      <h2 className="film-card__title">{name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{genre}</span>
        <span className="film-card__year">{released}</span>
      </p>

      <div className="film-card__buttons">
        <button onClick={handleClickPlayButton} className="btn btn--play film-card__button" type="button">
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"></use>
          </svg>
          <span>Play</span>
        </button>
        <button onClick={handleClickMyListButton} className="btn btn--list film-card__button" type="button">
          <svg viewBox="0 0 19 20" width="19" height="20">
            <use xlinkHref={isFavorite ? '#in-list' : '#add'}></use>
          </svg>
          <span>My list</span>
        </button>

        {children}

      </div>
    </div>
  );
}

export default memo(FilmCardDesc);
