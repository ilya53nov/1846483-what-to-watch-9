import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import {AppRoute, AuthorizationStatus} from '../../const';
import PrivateRoute from '../../private-route';
import {Film} from '../../types/film';
import {Comment} from '../../types/comment';

type AppScreenProps = {
  films: Film[];
  comments: Comment[];
}

function App({films, comments}:AppScreenProps): JSX.Element {
  const favoriteFilms = films.filter((film) => film.isFavorite);

  return (
    <BrowserRouter>
      <Routes>

        <Route path={AppRoute.Main} element={<MainScreen films={films} comments={comments}/>} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
            <MyListScreen films={favoriteFilms}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.AddReview} element={<AddReviewScreen films={films}/>} />
        <Route path={AppRoute.Film} element={<FilmScreen films={films} />} />
        <Route path={AppRoute.Player} element={<PlayerScreen film={films[0]} />} />
        <Route path={AppRoute.SignIn} element={<SignInScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
