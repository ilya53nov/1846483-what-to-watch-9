import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';

const FILMS_MAX_COUNT = 4;

type FilmListProops = {
  films: Film[];
  genre?: string;
  id?: number;
}

export default function FilmList({films, genre, id}: FilmListProops):JSX.Element {
  if (genre) {
    films = films.filter((film) => film.genre === genre && film.id !== id).slice(0, FILMS_MAX_COUNT);
  }

  const filmList = films
    .map((film) => <SmallFilmCard key={film.id} film={film} />);

  return(
    <div className="catalog__films-list">
      {filmList}
    </div>
  );
}
