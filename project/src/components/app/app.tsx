import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../private-route';

type AppScreenProps = {
  title: string;
  genre: string;
  year: number;
}

function App({title, genre, year}:AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>

        <Route path={AppRoute.Main} element={<MainScreen title={title} genre={genre} year={year}/>} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
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

    </BrowserRouter>
  );
}

export default App;
