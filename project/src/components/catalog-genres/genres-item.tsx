import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { choiceGenre } from '../../store/action';

type GenresItemProps = {
  genre: string;
  activeGenre: string;
}

export default function GenresItem({genre, activeGenre}: GenresItemProps):JSX.Element {
  const dispatch = useAppDispatch();

  return(
    <li className={`catalog__genres-item${genre === activeGenre ? ' catalog__genres-item--active' : ''}`}>
      <Link onClick={() => {
        dispatch(choiceGenre(genre));
      }}
      to='/' className="catalog__genres-link"
      >{genre}
      </Link>
    </li>
  );
}
