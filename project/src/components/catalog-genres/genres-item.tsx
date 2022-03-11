import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { choiceGenre } from '../../store/action';

type GenresItemProps = {
  genre: string;
  setActiveGenre: (genre: string) => void;
  activeGenre: string;
}

export default function GenresItem({genre, activeGenre, setActiveGenre}: GenresItemProps):JSX.Element {
  const dispatch = useAppDispatch();

  return(
    <li className={`catalog__genres-item${genre === activeGenre ? ' catalog__genres-item--active' : ''}`}>
      <Link onClick={() => {
        dispatch(choiceGenre(genre));
        setActiveGenre(genre);
      }}
      to='/' className="catalog__genres-link"
      >{genre}
      </Link>
    </li>
  );
}
