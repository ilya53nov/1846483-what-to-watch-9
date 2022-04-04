import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayerControlFullScreen from '../../components/player-control/player-control-full-screen';
import PlayerControlPause from '../../components/player-control/player-control-pause';
import PlayerControlPlay from '../../components/player-control/player-control-play';
import VideoPlayer from '../../components/video-player/video-player';
import { useAppSelector } from '../../hooks';
import { getFilm } from '../../store/app-data/selectors';

export default function PlayerScreen():JSX.Element{
  const [isPlay, setIsPlay] = useState(true);

  const film = useAppSelector(getFilm);

  const navigate = useNavigate();

  const {videoLink, previewVideoLink, runTime} = film;

  const handleClickExitButton = () => {
    navigate(-1);
  };

  const handleClickPlayButton = () => {
    setIsPlay(true);
  };

  const handleClickPauseButton = () => {
    setIsPlay(false);
  };

  return(
    <div className="player">
      <VideoPlayer isMute={false} isPlay={isPlay} poster={previewVideoLink} src={videoLink} />

      <button onClick={handleClickExitButton} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
          </div>
          <div className="player__time-value">{dayjs.duration(runTime, 'minutes').format(`${runTime > 60 ? 'H[:]m[:]ss' : 'm'}`)}</div>
        </div>

        <div className="player__controls-row">

          {isPlay
            ? <PlayerControlPause onClick={handleClickPauseButton}/>
            : <PlayerControlPlay onClick={handleClickPlayButton}/>}

          <div className="player__name">Transpotting</div>

          <PlayerControlFullScreen />
        </div>
      </div>
    </div>
  );
}
