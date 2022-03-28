import { AuthorizationStatus } from '../const';
import { store } from '../store/index';
import { Comments } from './comment';
import { Film, Films } from './film';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  data: UserData;
}

export type AppData = {
  films: {
    data: Films;
    isLoaded: boolean;
    filteredFilmsByGenre: Films;
  }

  fovoriteFilms: {
    data: Films;
    isLoaded: boolean;
  }

  film: {
    data: Film;
    isLoaded: boolean;
    similarFilms: Films;
    isFound: boolean | Unknown;

    comments: {
      data: Comments;
      isLoaded: boolean;
    };
  }

  initialFilms: Films;

  promoFilm: Film;

  error: string;
}

export type AppProcess = {
  activeGenre: string;
  showedFilmsCount: number;
  filteredFilmsByGenre: Films;
}

export type Unknown = 'UNKNOWN';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
