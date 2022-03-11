import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import GenresItem from './genres-item';

type GenresListProps = {
  genres: string[];
}

export default function GenresList({genres}: GenresListProps):JSX.Element{
  const activeGenre = useAppSelector((state) => state.genre);

  const [activeItem, setActiveItem] = useState(activeGenre);

  const genresList = genres.map((genre) => <GenresItem key={genre} genre={genre} setActiveGenre={setActiveItem} activeGenre={activeItem} />);

  return(
    <ul className="catalog__genres-list">{genresList}</ul>
  );
}
