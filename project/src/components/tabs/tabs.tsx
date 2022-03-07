import { useState } from 'react';
import { Tab } from '../../const';
import { Comment } from '../../types/comment';
import { Film } from '../../types/film';
import { TabNameStrings } from '../../types/tab';
import DetailsTab from './details-tab';
import NavList from './navigation/nav-list';
import OverviewTab from './overview-tab';
import ReviewsTab from './reviews-tab';

const DEFAULT_TAB = Tab.Overview;

type TabsProps = {
  film: Film;
  comments: Comment[];
}

type getTabProps = {
  activeItem: TabNameStrings;
  film: Film;
  comments: Comment[];
}

function getTab({activeItem, film, comments}: getTabProps): JSX.Element {

  if (activeItem === Tab.Details) {
    return <DetailsTab film={film}/>;
  }

  if (activeItem === Tab.Reviews) {
    return <ReviewsTab comments={comments}/>;
  }

  return <OverviewTab film={film}/>;
}

export default function Tabs({film, comments}: TabsProps):JSX.Element {
  const [activeItem, setActiveItem] = useState<TabNameStrings>(DEFAULT_TAB);

  return(
    <div className="film-card__desc">
      <NavList activeItem={activeItem} setActiveItem={setActiveItem} />

      {getTab({activeItem, film, comments})}
    </div>
  );
}
