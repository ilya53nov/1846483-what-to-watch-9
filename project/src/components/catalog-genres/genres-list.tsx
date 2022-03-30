import { useAppSelector } from '../../hooks';
import { getActiveGenre } from '../../store/app-process/selectors';
import GenresItem from './genres-item';

type GenresListProps = {
  genres: string[];
}

export default function GenresList({genres}: GenresListProps):JSX.Element{
  const activeGenre = useAppSelector(getActiveGenre);

  const genresList = genres.map((genre) => <GenresItem key={genre} genre={genre} activeGenre={activeGenre} />);

  return(
    <ul className="catalog__genres-list">{genresList}</ul>
  );
}
