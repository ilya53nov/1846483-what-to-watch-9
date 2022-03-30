import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';
import { memo } from 'react';

type FilmListProops = {
  films: Film[];
}

function FilmList({films}: FilmListProops):JSX.Element {
  const filmList = films
    .map((film) => <SmallFilmCard key={film.id} film={film} />);

  return(
    <div className="catalog__films-list">
      {filmList}
    </div>
  );
}

export default memo(FilmList);
