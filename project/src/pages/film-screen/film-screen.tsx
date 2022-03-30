import { Link, useParams } from 'react-router-dom';
import FilmList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import PageFooter from '../../components/page-footer/page-footer';
import UserBlock from '../../components/user-block/user-block';
import Tabs from '../../components/tabs/tabs';
import { fetchGetFilmAction, fetchGetSimilarFilmsAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import { useEffect } from 'react';
import { AuthorizationStatus } from '../../const';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import FilmCardDesc from '../../components/film-card-desc/film-card-desc';
import { getComments, getFilm, getFoundedFilmStatus, getLoadedFilmStatus, getSimilarFilms } from '../../store/app-data/selectors';

export default function FilmScreen():JSX.Element{
  const params = useParams<string>();

  const filmId = Number(params.id);

  const dispatch = useAppDispatch();

  const film = useAppSelector(getFilm);

  const similarFilms = useAppSelector(getSimilarFilms);

  const comments = useAppSelector(getComments);

  const filmIsFound = useAppSelector(getFoundedFilmStatus);

  const filmIsLoaded = useAppSelector(getLoadedFilmStatus);

  const user = useAppSelector(({USER}) => USER);

  useEffect(() => {
    dispatch(fetchGetFilmAction(filmId));
    dispatch(fetchGetSimilarFilmsAction(filmId));
  },[dispatch, filmId]);

  if (filmIsFound !== 'UNKNOWN' && !filmIsFound) {
    return <NotFoundScreen />;
  }

  if (!filmIsLoaded) {
    return <LoadingScreen />;
  }

  const {name, id, posterImage, backgroundImage} = film;

  return(
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={backgroundImage} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <Logo/>
            <UserBlock/>
          </header>

          <div className="film-card__wrap">
            <FilmCardDesc film={film}>
              {user.authorizationStatus === AuthorizationStatus.Auth
                ? <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>
                : ''}
            </FilmCardDesc>
          </div>

        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs film={film} comments={comments}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList films={similarFilms}/>
        </section>

        <PageFooter />
      </div>
    </>
  );
}
