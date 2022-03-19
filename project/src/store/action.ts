import { createAction } from '@reduxjs/toolkit';
import { Action} from '../const';

export const choiceGenre = createAction(Action.ChoiceGenre, (genre) => ({
  payload: genre,
}));

export const showMore = createAction(Action.ShowMore);

export const resetShowedFilmsCount = createAction(Action.ResetShowedFilmsCount);

export const requireAuthorization = createAction(Action.RequireAuthorization, (data) => ({
  payload: data,
}));

export const setError = createAction<string>(Action.SetError);

export const loadFilms = createAction(Action.LoadFilms, (films) => ({
  payload: films,
}));

export const loadSimilarFilms = createAction(Action.LoadSimilarFilms, (films) => ({
  payload: films,
}));

export const loadFilm = createAction(Action.LoadFilm, (film) => ({
  payload: film,
}));

export const loadPromoFilm = createAction(Action.LoadPromoFilm, (promoFilm) => ({
  payload: promoFilm,
}));

export const loadComments = createAction(Action.LoadComments, (comments) => ({
  payload: comments,
}));

export const login = createAction(Action.Login, (data) => ({
  payload: data,
}));
