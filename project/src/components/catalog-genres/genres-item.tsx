import { Link } from 'react-router-dom';

type GenresItemProps = {
  genre: string;
  setActiveGenre: (genre: string) => void;
  activeGenre: string;
}

export default function GenresItem({genre, activeGenre, setActiveGenre}: GenresItemProps):JSX.Element {
  return(
    <li className={`catalog__genres-item${genre === activeGenre ? ' catalog__genres-item--active' : ''}`}>
      <Link onClick={() => setActiveGenre(genre)} to='/' className="catalog__genres-link">{genre}</Link>
    </li>
  );
}
