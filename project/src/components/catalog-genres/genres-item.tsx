import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getInitialFilms } from '../../store/app-data/selectors';
import { choiceGenre, filterFilmsByGenre } from '../../store/app-process/app-process';

type GenresItemProps = {
  genre: string;
  activeGenre: string;
}

export default function GenresItem({genre, activeGenre}: GenresItemProps):JSX.Element {
  const dispatch = useAppDispatch();

  const initialFilms = useAppSelector(getInitialFilms);

  return(
    <li className={`catalog__genres-item${genre === activeGenre ? ' catalog__genres-item--active' : ''}`}>
      <Link onClick={() => {
        dispatch(choiceGenre(genre));
        dispatch(filterFilmsByGenre(initialFilms));
      }}
      to='/' className="catalog__genres-link"
      >{genre}
      </Link>
    </li>
  );
}
