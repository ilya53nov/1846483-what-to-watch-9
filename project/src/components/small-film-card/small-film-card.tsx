import { useState } from 'react';
import { Link} from 'react-router-dom';
import { Film } from '../../types/film';
import VideoPlayer from '../video-player/video-player';

const DEFAULT_MUTE = true;
const WAIT_TIME_MS = 1000;

type SmallFilmCardProps = {
  film: Film;
}

export default function SmallFilmCard({film}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, id, previewVideoLink} = film;

  const [isPlay, setIsPlay] = useState(false);

  let timeoutId: ReturnType<typeof setTimeout> | null;

  const turnOffPlay = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }

    setIsPlay(false);
  };

  const onMouseEnterHandler = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => setIsPlay(true), WAIT_TIME_MS);
  };

  const onMouseLeaveHandler = () => {
    turnOffPlay();
  };

  const onClickHandler = () => {
    turnOffPlay();
  };

  return (
    <article className="small-film-card catalog__films-card" onClick={onClickHandler} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <Link to={`/films/${id}`}>
        <div className="small-film-card__image">

          {isPlay
            ? <VideoPlayer src={previewVideoLink} poster={previewImage} isPlay={isPlay} isMute={DEFAULT_MUTE}/>
            : <img src={previewImage} alt={name} width="280" height="175" />}

        </div>
      </Link>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}

