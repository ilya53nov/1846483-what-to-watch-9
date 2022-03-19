import { Route, Routes, useLocation} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import {AppRoute} from '../../const';
import PrivateRoute from '../../private-route';
import { useAppDispatch, useAppSelector} from '../../hooks';
import { resetShowedFilmsCount } from '../../store/action';
import { useEffect } from 'react';
import { LoadingScreen } from '../loading-screen/loading-screen';


function App(): JSX.Element {
  const {pathname} = useLocation();

  const dispatch = useAppDispatch();

  const {isLoaded} = useAppSelector((state) => state.films);

  useEffect(() => {
    if (pathname !== AppRoute.Main) {
      dispatch(resetShowedFilmsCount());
    }
  },[pathname, dispatch]);

  if (!isLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (

    <Routes>

      <Route path={AppRoute.Main} element={<MainScreen/>} />
      <Route path={AppRoute.MyList} element={
        <PrivateRoute>
          <MyListScreen />
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.AddReview} element={<AddReviewScreen />} />
      <Route path={AppRoute.Film} element={<FilmScreen />} />
      <Route path={AppRoute.Player} element={<PlayerScreen />} />
      <Route path={AppRoute.SignIn} element={<SignInScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>


  );
}

export default App;
