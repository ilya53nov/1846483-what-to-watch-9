import { Link} from 'react-router-dom';
import { Film } from '../../types/film';

type SmallFilmCardProps = {
  film: Film;
  setState: (activeFilmCard: number) => void;
}

export default function SmallFilmCard({film, setState}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, id} = film;

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => setState(id)}>
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}
