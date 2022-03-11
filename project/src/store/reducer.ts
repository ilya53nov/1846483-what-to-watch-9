import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_GENRE, MAX_GENRES } from '../const';
import { films } from '../mocks/films';
import { choiceGenre } from './action';

const initialState = {
  genre: DEFAULT_GENRE,
  initialFilms: films,
  films: films,
  genres: [...new Set([DEFAULT_GENRE, ...Array.from(films, ({genre}) => genre)])].slice(0, MAX_GENRES),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(choiceGenre, (state, action) => {
      state.genre = action.payload;
      state.films = state.genre === DEFAULT_GENRE ? state.initialFilms : state.initialFilms.filter((film) => film.genre === state.genre);
    });
});
