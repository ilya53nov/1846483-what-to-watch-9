import { useNavigate } from 'react-router-dom';
import FilmList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import PageFooter from '../../components/page-footer/page-footer';
import UserBlock from '../../components/user-block/user-block';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/app-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

export default function MyListScreen():JSX.Element {
  const navigate = useNavigate();

  const userAuthorizationStatus = useAppSelector(getAuthorizationStatus);

  if (userAuthorizationStatus !== AuthorizationStatus.Auth) {
    navigate(AppRoute.SignIn);
  }

  const favoriteFilms = useAppSelector(getFavoriteFilms);

  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        {favoriteFilms.length > 0
          ? <FilmList films={favoriteFilms} />
          : ''}

      </section>

      <PageFooter />
    </div>
  );
}
