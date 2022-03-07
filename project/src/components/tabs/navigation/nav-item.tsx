import { Link } from 'react-router-dom';
import { TabNameStrings } from '../../../types/tab';

type NavItemProps = {
  name: TabNameStrings;
  activeItem: TabNameStrings;
  setActiveItem: (name: TabNameStrings) => void;
}

export default function NavItem({name, activeItem, setActiveItem}: NavItemProps):JSX.Element {
  return(
    <li className={`film-nav__item${name === activeItem ? ' film-nav__item--active': ''}`}>
      <Link onClick={() => setActiveItem(name)} to="#" className="film-nav__link">{name}</Link>
    </li>
  );
}


