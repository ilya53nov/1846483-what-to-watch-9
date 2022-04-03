import FilmList from '../../components/film-list/film-list';
import { Fragment, useEffect } from 'react';
import Logo from '../../components/logo/logo';
import PageFooter from '../../components/page-footer/page-footer';
import UserBlock from '../../components/user-block/user-block';
import GenresList from '../../components/catalog-genres/genres-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import FilmCardDesc from '../../components/film-card-desc/film-card-desc';
import { DEFAULT_GENRE, MAX_GENRES } from '../../const';
import { Films } from '../../types/film';
import { getInitialFilms, getPromoFIlm } from '../../store/app-data/selectors';
import { getFilteredFilmsByGenre, getShowedFilmsCount } from '../../store/app-process/selectors';
import { filterFilmsByGenre } from '../../store/app-process/app-process';

const getGenres = (films: Films) => [...new Set([DEFAULT_GENRE, ...Array.from(films, ({genre}) => genre)])].slice(0, MAX_GENRES);

export default function MainScreen():JSX.Element {
  const dispatch = useAppDispatch();

  const initialFIlms = useAppSelector(getInitialFilms);

  useEffect(() => {
    dispatch(filterFilmsByGenre(initialFIlms));
  }, [dispatch, initialFIlms]);

  const filteredFilmsByGenre = useAppSelector(getFilteredFilmsByGenre);

  const filmsCount = filteredFilmsByGenre.length;

  const showedFilmsCount = useAppSelector(getShowedFilmsCount);

  const genres = getGenres(initialFIlms);

  const filmsToShow = filteredFilmsByGenre.slice(0, showedFilmsCount);

  const promoFilm = useAppSelector(getPromoFIlm);

  const {name, backgroundImage, posterImage} = promoFilm;
  return (
    <Fragment>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>
          <UserBlock/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={posterImage} alt={name} width="218" height="327" />
            </div>

            <FilmCardDesc film={promoFilm}/>

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres}/>

          <FilmList films={filmsToShow} />

          <ShowMoreButton showedFilmsCount={showedFilmsCount} filmsCount={filmsCount}/>
        </section>

        <PageFooter />
      </div>
    </Fragment>
  );
}
