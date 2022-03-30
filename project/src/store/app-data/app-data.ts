import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_GENRE, NameSpace } from '../../const';
import { Comments } from '../../types/comment';
import { Film, Films } from '../../types/film';
import { AppData} from '../../types/state';

const initialState: AppData = {
  film: {
    data: {} as Film,
    isLoaded: false,
    similarFilms: [] as Films,
    isFound: 'UNKNOWN',

    comments: {
      data: {} as Comments,
      isLoaded: false,
    },
  },

  fovoriteFilms: {
    data: {} as Films,
    isLoaded: false,
  },

  films: {
    data: [] as Films,
    isLoaded: false,
    filteredFilmsByGenre: [] as Films,
  },

  initialFilms: [] as Films,

  promoFilm: {} as Film,

  error: '',
};

export const appData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    filterFilmsByGenre: (state, action) => {
      state.films.filteredFilmsByGenre = action.payload === DEFAULT_GENRE ? state.initialFilms : state.initialFilms.filter((film) => film.genre === action.payload);
    },
    loadFilms: (state, action) => {
      state.initialFilms = action.payload.data;
      state.films.data = action.payload.data;
      state.films.isLoaded = true;
    },
    loadFavoriteFilms: (state, action) => {
      state.fovoriteFilms.data = action.payload.data;
      state.fovoriteFilms.isLoaded = true;
    },
    loadFilm: (state, action) => {
      state.film.data = action.payload.data;
      state.film.isLoaded = action.payload.isLoaded;
      state.film.isFound = action.payload.isFound;
    },
    loadPromoFilm: (state, action) => {
      state.promoFilm = action.payload;
    },
    loadSimilarFilms: (state, action) => {
      state.film.similarFilms = action.payload;
    },
    loadComments: (state, action) => {
      state.film.comments.data = action.payload;
      state.film.comments.isLoaded = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms, loadComments, setError, filterFilmsByGenre, loadFavoriteFilms} = appData.actions;
