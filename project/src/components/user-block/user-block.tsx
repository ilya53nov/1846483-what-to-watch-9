import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmsAction, logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';

export default function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const user = useAppSelector(getUserData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickSignOutButton = () => {
    dispatch(logoutAction());
    navigate(AppRoute.Main);
  };

  const handleClickAvatar = () => {
    dispatch(fetchFavoriteFilmsAction());
    navigate(AppRoute.MyList);
  };

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
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
          <img onClick={handleClickAvatar} src={user.avatarUrl} alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to='/' onClick={handleClickSignOutButton} className="user-block__link">Sign out</Link>
      </li>
    </ul>
  );
}
