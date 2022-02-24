import { Link } from 'react-router-dom';

type GenresItemProps = {
  genre: string;
  setState: (genre: string) => void;
  state: string;
}

export default function GenresItem({genre, state, setState}: GenresItemProps):JSX.Element {
  return(
    <li className={`catalog__genres-item${genre === state ? ' catalog__genres-item--active' : ''}`}>
      <Link onClick={() => setState(genre)} to='/' className="catalog__genres-link">{genre}</Link>
    </li>
  );
}
