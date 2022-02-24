import { Link, useParams } from 'react-router-dom';
import CommentSubmitForm from '../../components/comment-submit-form/comment-submit-form';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import {Film} from '../../types/film';

type AddReviewProps = {
  films: Film[];
}

export default function AddReviewScreen({films}:AddReviewProps):JSX.Element{
  const params = useParams();

  const paramsId = params.id;

  let film: Film;

  paramsId
    ? film = films.filter((currentFilm) => currentFilm.id === +paramsId)[0]
    : film = films[0];

  const {name, id, posterImage, backgroundImage} = film;

  return(
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}`} className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={`/films/${id}/review`} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <UserBlock/>
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={posterImage} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <CommentSubmitForm />
      </div>
    </section>
  );
}
