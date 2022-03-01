import { useState } from 'react';
import GenresItem from './genres-item';
import { genres } from '../../const';

const DEFAULT_GENRE = 'All genres';

export default function GenresList():JSX.Element{
  const [activeItem, setActiveItem] = useState(DEFAULT_GENRE);

  const genresList = genres.map((genre) => <GenresItem key={genre} genre={genre} setActiveGenre={setActiveItem} activeGenre={activeItem} />);

  return(
    <ul className="catalog__genres-list">{genresList}</ul>
  );
}
