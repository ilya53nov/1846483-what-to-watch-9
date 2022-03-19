import FilmList from '../../components/film-list/film-list';
import { Fragment } from 'react';
import Logo from '../../components/logo/logo';
import PageFooter from '../../components/page-footer/page-footer';
import UserBlock from '../../components/user-block/user-block';
import GenresList from '../../components/catalog-genres/genres-list';
import { useAppSelector } from '../../hooks';
import ShowMoreButton from '../../components/show-more-button/show-more-button';

export default function MainScreen():JSX.Element {
  const genres = useAppSelector((state) => state.films.genres);

  const filmsCount = useAppSelector((state) => state.films.data.length);

  const showedFilmsCount = useAppSelector((state) => state.showedFilmsCount);

  const films = useAppSelector((state) => state.films.data).slice(0, showedFilmsCount);

  const promoFilm = useAppSelector((state) => state.promoFilm);

  const {name, genre, released, backgroundImage, posterImage} = promoFilm;
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

            <div className="film-card__desc">
              <h2 className="film-card__title">{name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList genres={genres}/>

          <FilmList films={films} />

          <ShowMoreButton showedFilmsCount={showedFilmsCount} filmsCount={filmsCount}/>
        </section>

        <PageFooter />
      </div>
    </Fragment>
  );
}
