import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, DEFAULT_GENRE, FILMS_PER_PAGE} from '../const';
import { Comments } from '../types/comment';
import { Film, Films } from '../types/film';
import { UserData } from '../types/user-data';
import { choiceGenre, loadComments, loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms, requireAuthorization, resetShowedFilmsCount, setError, showMore } from './action';

type InitialState = {
  activeGenre: string;
  initialFilms: Films;
  showedFilmsCount: number;
  error: string;
  promoFilm: Film;

  film: {
    data: Film;
    isLoaded: boolean;
    similarFilms: Films;
    errorLoad: boolean;

    comments: {
      data: Comments;
      isLoaded: boolean;
    };
  };

  films: {
    data: Films;
    genres: string[];
    isLoaded: boolean;
  };

  user: {
    authorizationStatus: AuthorizationStatus;
    data: UserData;
  };
}

const initialState: InitialState = {
  activeGenre: DEFAULT_GENRE,
  initialFilms: {} as Films,
  showedFilmsCount: FILMS_PER_PAGE,
  error: '',

  promoFilm: {} as Film,

  films: {
    data: [] as Films,
    genres: [],
    isLoaded: false,
  },

  film: {
    data: {} as Film,
    isLoaded: false,
    similarFilms: [] as Films,
    errorLoad: false,

    comments: {
      data: {} as Comments,
      isLoaded: false,
    },
  },

  user: {
    authorizationStatus: AuthorizationStatus.Unknown,
    data: {} as UserData,
  },

};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(choiceGenre, (state, action) => {
      state.showedFilmsCount = FILMS_PER_PAGE;
      state.activeGenre = action.payload;
      state.films.data = state.activeGenre === DEFAULT_GENRE ? state.initialFilms : state.initialFilms.filter((film) => film.genre === state.activeGenre);
    })
    .addCase(showMore, (state) => {
      state.showedFilmsCount = state.showedFilmsCount + FILMS_PER_PAGE;
    })
    .addCase(resetShowedFilmsCount, (state) => {
      state.showedFilmsCount = FILMS_PER_PAGE;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.initialFilms = action.payload.data;
      state.films.data = action.payload.data;
      state.films.genres = action.payload.genres;
      state.films.isLoaded = true;
    })
    .addCase(loadFilm, (state, action) => {
      state.film.data = action.payload.data;
      state.film.isLoaded = action.payload.isLoaded;
      state.film.errorLoad = action.payload.errorLoad;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.film.comments.data = action.payload;
      state.film.comments.isLoaded = true;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.film.similarFilms = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.user.authorizationStatus = action.payload.authorizationStatus;
      state.user.data = action.payload.data;
    });
});


