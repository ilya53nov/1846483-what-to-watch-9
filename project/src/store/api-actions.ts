import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api, store } from '.';
import { Action, APIRoute, AuthorizationStatus, HTTP_CODE, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { Comments } from '../types/comment';
import { Film, Films } from '../types/film';
import { UserData } from '../types/user-data';
import {saveToken, dropToken} from '../services/token';
import { CommentData } from '../types/comment-data';
import { loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms, loadComments, setError, loadFavoriteFilms } from './app-data/app-data';
import { requireAuthorization } from './user-process/user-process';
import { FilmStatus } from '../types/film-status';

export const clearErrorAction = createAsyncThunk(
  'game/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError('')),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmsAction = createAsyncThunk(
  Action.LoadFilms,
  async () => {
    const {data} = await api.get<Films>(APIRoute.Films);
    store.dispatch(loadFilms({data}));
  },
);

export const fetchFilmPromoAction = createAsyncThunk(
  Action.LoadPromoFilm,
  async () => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);
    store.dispatch(loadPromoFilm(data));
  },
);

export const fetchGetFilmAction = createAsyncThunk(
  Action.LoadFilm,
  async (filmId: number) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
      store.dispatch(loadFilm({data, isLoaded: true, isFound: true}));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HTTP_CODE.NOT_FOUND) {
          store.dispatch(loadFilm({isLoaded: false, isFound: false}));
        }
      }
    }

  },
);

export const fetchGetCommentsAction = createAsyncThunk(
  Action.LoadComments,
  async (filmId: number) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${filmId}`);
    store.dispatch(loadComments(data));
  },
);

export const fetchGetSimilarFilmsAction = createAsyncThunk(
  Action.LoadSimilarFilms,
  async (filmId: number) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`);
    store.dispatch(loadSimilarFilms(data));
  },
);

export const checkAuthAction = createAsyncThunk(
  Action.Login,
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HTTP_CODE.UNAUTHORIZED) {
          store.dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
        }
      }
    }

  },
);

export const loginAction = createAsyncThunk(
  Action.Login,
  async ({login: email, password}: AuthData) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    store.dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth, data: data}));
  },
);

export const logoutAction = createAsyncThunk(
  Action.Logout,
  async () => {
    await api.delete(APIRoute.Logout);
    dropToken();
    store.dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
  },
);

export const addComment = createAsyncThunk(
  Action.AddComment,
  async ({comment, rating, filmId}:CommentData) => {
    await api.post<CommentData>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
  },
);

export const changeStatusToView = createAsyncThunk(
  Action.ChangeStatusToView,
  async ({filmId: id, status: isFavorite}: FilmStatus) => {
    const {data} = await api.post<FilmStatus>(`${APIRoute.Favorite}/${id}/${isFavorite}`);
    store.dispatch(loadFilm({data, isLoaded: true, isFound: true}));
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk(
  Action.LoadFovoriteFilms,
  async () => {
    const {data} = await api.get<Films>(APIRoute.Favorite);
    store.dispatch(loadFavoriteFilms({data}));
  },
);

