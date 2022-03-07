import { Tab } from '../../../const';
import { TabNameStrings } from '../../../types/tab';
import NavItem from './nav-item';

type NavListProps = {
  activeItem: TabNameStrings;
  setActiveItem: (name: TabNameStrings) => void;
}

export default function NavList({activeItem, setActiveItem}: NavListProps):JSX.Element {
  const tabs = Object.values(Tab);
  const navList = tabs.map((tab) => <NavItem key={tab} name={tab} activeItem={activeItem} setActiveItem={setActiveItem}/>);

  return(
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        {navList}
      </ul>
    </nav>
  );
}
