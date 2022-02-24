import SmallFilmCard from '../small-film-card/small-film-card';
import { Film } from '../../types/film';
import { useState } from 'react';

type FilmListProops = {
  films: Film[];
}

export default function FilmList({films}: FilmListProops):JSX.Element {
  const [activeFilmCard, setActiveFilmCard] = useState(0);

  const filmList = films
    .map((film) => <SmallFilmCard key={film.id} film={film} setState={setActiveFilmCard}/>);

  return(
    <div className="catalog__films-list">
      {filmList}
    </div>
  );
}
