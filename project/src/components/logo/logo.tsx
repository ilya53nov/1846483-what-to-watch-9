import {AppRoute} from '../../const';
import { Link } from 'react-router-dom';

type LogoProps = {
  additionalClass?: string;
}

export default function Logo({additionalClass}: LogoProps): JSX.Element {
  const defaultClass = 'logo__link';

  return (
    <div className="logo">
      <Link to={AppRoute.Main} className={additionalClass ? `${defaultClass} ${additionalClass}` : defaultClass} >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}
