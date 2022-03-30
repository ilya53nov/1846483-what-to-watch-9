import { useAppDispatch } from '../../hooks';
import { showMore } from '../../store/app-process/app-process';

type ShowMoreButtonProps = {
  showedFilmsCount: number;
  filmsCount: number;
}

export default function ShowMoreButton({showedFilmsCount, filmsCount}: ShowMoreButtonProps): JSX.Element | null {
  const dispatch = useAppDispatch();

  if (showedFilmsCount >= filmsCount) {
    return(null);
  }

  return(
    <div className="catalog__more">
      <button onClick={() => {
        dispatch(showMore());
      }} className="catalog__button" type="button"
      >Show more
      </button>
    </div>
  );
}
