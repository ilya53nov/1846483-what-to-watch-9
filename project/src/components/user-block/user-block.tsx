import { Link } from 'react-router-dom';

export default function UserBlock(): JSX.Element {
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link to='/' className="user-block__link">Sign out</Link>
      </li>
    </ul>
  );
}
