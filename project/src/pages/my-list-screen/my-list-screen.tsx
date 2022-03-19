import FilmList from '../../components/film-list/film-list';
import Logo from '../../components/logo/logo';
import PageFooter from '../../components/page-footer/page-footer';
import UserBlock from '../../components/user-block/user-block';
import { useAppSelector } from '../../hooks';

export default function MyListScreen():JSX.Element {
  const {data} = useAppSelector((state) => state.films);

  return(
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo/>

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock/>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <FilmList films={data} />
      </section>

      <PageFooter />
    </div>
  );
}
