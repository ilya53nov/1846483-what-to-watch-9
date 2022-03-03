import { useState } from 'react';
import { Link} from 'react-router-dom';
import { Film } from '../../types/film';
import VideoPlayer from '../video-player/video-player';

const DEFAULT_MUTE = true;

type SmallFilmCardProps = {
  film: Film;
  setActiveFilmCard: (activeFilmCard: number) => void;
}

export default function SmallFilmCard({film, setActiveFilmCard}: SmallFilmCardProps): JSX.Element {
  const {previewImage, name, id, previewVideoLink} = film;

  const [isPlay, setIsPlay] = useState(false);

  let currentPlay = true;

  const toggleIsPlay = () => {
    setIsPlay(currentPlay);
  };

  const onMouseEnterHandler = () => {
    toggleIsPlay();
    currentPlay = true;
  };

  const onMouseLeaveHandler = () => {
    currentPlay = false;
    toggleIsPlay();
  };

  return (
    <article className="small-film-card catalog__films-card" onMouseEnter={() => setTimeout(() => onMouseEnterHandler(), 1000) } onMouseLeave={() => onMouseLeaveHandler()}>
      <div className="small-film-card__image">

        {isPlay
          ? <VideoPlayer src={previewVideoLink} poster={previewImage} isPlay={isPlay} isMute={DEFAULT_MUTE}/>
          : <img src={previewImage} alt={name} width="280" height="175" />}

      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
}
