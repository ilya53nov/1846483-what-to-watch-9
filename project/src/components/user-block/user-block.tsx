import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';

export default function UserBlock(): JSX.Element {
  const {authorizationStatus, data} = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(logoutAction());
    navigate(AppRoute.Main);
  };

  if (authorizationStatus === AuthorizationStatus.NoAuth || !data) {
    return (
      <div className="user-block">
        <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
      </div>
    );
  }

  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src={data.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to='/' onClick={onClick} className="user-block__link">Sign out</Link>
      </li>
    </ul>
  );
}
