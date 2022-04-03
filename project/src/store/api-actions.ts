import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { store } from '.';
import { Action, APIRoute, AuthorizationStatus, DEFAULT_ERROR, HTTP_CODE, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { Comments } from '../types/comment';
import { Film, Films } from '../types/film';
import { UserData } from '../types/user-data';
import {saveToken, dropToken} from '../services/token';
import { CommentData } from '../types/comment-data';
import { loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms, loadComments, setError, loadFavoriteFilms } from './app-data/app-data';
import { requireAuthorization } from './user-process/user-process';
import { FilmStatus } from '../types/film-status';
import { AppDispatch, State } from '../types/state';
import { disableForm, enableForm } from './app-process/app-process';
import { errorHandle } from '../services/error-handle';
import { redirectToRoute } from './action';

export const clearErrorAction = createAsyncThunk(
  Action.ClearError,
  () => {
    setTimeout(
      () => store.dispatch(setError(DEFAULT_ERROR)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.LoadFilms,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    dispatch(loadFilms({data}));
  },
);

export const fetchFilmPromoAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.LoadPromoFilm,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.PromoFilm);
    dispatch(loadPromoFilm(data));
  },
);

export const fetchGetFilmAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.LoadFilm,
  async (filmId, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
      dispatch(loadFilm({data, isLoaded: true, isFound: true}));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HTTP_CODE.NOT_FOUND) {
          dispatch(loadFilm({isLoaded: false, isFound: false}));
        }
      }
    }
  },
);

export const fetchGetCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.LoadComments,
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Comments>(`${APIRoute.Comments}/${filmId}`);
    dispatch(loadComments(data));
  },
);

export const fetchGetSimilarFilmsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.LoadSimilarFilms,
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`);
    dispatch(loadSimilarFilms(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.Login,
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth}));

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === HTTP_CODE.UNAUTHORIZED) {
          dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
        }
      }
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.Login,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.Auth, data: data}));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.Logout,
  async (_arg, { dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization({authorizationStatus: AuthorizationStatus.NoAuth}));
  },
);

export const addComment = createAsyncThunk<void, CommentData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.AddComment,
  async ({comment, rating, filmId}, {dispatch, extra: api}) => {
    try {
      dispatch(disableForm());
      await api.post<CommentData>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
      dispatch(enableForm());
      dispatch(redirectToRoute(`films/${filmId}`));
    } catch (error) {
      errorHandle(error);
      dispatch(enableForm());
    }
  },
);

export const changeStatusToView = createAsyncThunk<void, FilmStatus, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.ChangeStatusToView,
  async ({filmId: id, status: isFavorite}, { dispatch, extra: api}) => {
    const {data} = await api.post<FilmStatus>(`${APIRoute.Favorite}/${id}/${isFavorite}`);
    dispatch(loadFilm({data, isLoaded: true, isFound: true}));
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  Action.LoadFovoriteFilms,
  async (_arg, { dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Favorite);
    dispatch(loadFavoriteFilms({data}));
  },
);
