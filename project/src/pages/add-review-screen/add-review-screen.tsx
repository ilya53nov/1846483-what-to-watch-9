import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CommentSubmitForm from '../../components/comment-submit-form/comment-submit-form';
import { LoadingScreen } from '../../components/loading-screen/loading-screen';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGetFilmAction } from '../../store/api-actions';

export default function AddReviewScreen():JSX.Element{
  const params = useParams();

  const filmId = Number(params.id);

  const dispatch = useAppDispatch();

  const {data, isLoaded} = useAppSelector((state) => state.film);

  useEffect(() => {
    dispatch(fetchGetFilmAction(filmId));
  }, [filmId, dispatch]);

  if (!isLoaded) {
    return(<LoadingScreen />);
  }

  const {name, id, posterImage, backgroundImage} = data;

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
