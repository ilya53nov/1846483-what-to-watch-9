import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_GENRE, INITIAL_SHOW_FILM_COUNT, MAX_GENRES } from '../const';
import { films } from '../mocks/films';
import { choiceGenre, resetShowedFilmsCount, showMore } from './action';

const initialState = {
  genre: DEFAULT_GENRE,
  initialFilms: films,
  showedFilmsCount: INITIAL_SHOW_FILM_COUNT,
  films: films,
  genres: [...new Set([DEFAULT_GENRE, ...Array.from(films, ({genre}) => genre)])].slice(0, MAX_GENRES),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(choiceGenre, (state, action) => {
      state.showedFilmsCount = INITIAL_SHOW_FILM_COUNT;
      state.genre = action.payload;
      state.films = state.genre === DEFAULT_GENRE ? state.initialFilms : state.initialFilms.filter((film) => film.genre === state.genre);
    })
    .addCase(showMore, (state) => {
      state.showedFilmsCount = state.showedFilmsCount + INITIAL_SHOW_FILM_COUNT;
    })
    .addCase(resetShowedFilmsCount, (state) => {
      state.showedFilmsCount = INITIAL_SHOW_FILM_COUNT;
    });
});
