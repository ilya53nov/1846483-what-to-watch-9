import { NameSpace } from '../../const';
import { Comments } from '../../types/comment';
import { Film, Films } from '../../types/film';
import { State} from '../../types/state';

export const getFilms = (state: State): Films => state[NameSpace.Data].films.data;

export const getFavoriteFilms = (state: State): Films => state[NameSpace.Data].favoriteFilms.data;

export const getFavoriteFilmsStatus = (state: State): boolean => state[NameSpace.Data].favoriteFilms.isLoaded;

export const getLoadedFilmsStatus = (state: State): boolean => state[NameSpace.Data].films.isLoaded;

export const getFilm = (state: State): Film => state[NameSpace.Data].film.data;

export const getLoadedFilmStatus = (state: State): boolean => state[NameSpace.Data].film.isLoaded;

export const getSimilarFilms = (state: State): Films => state[NameSpace.Data].film.similarFilms;

export const getFoundedFilmStatus = (state: State): boolean | string => state[NameSpace.Data].film.isFound;

export const getComments = (state: State): Comments => state[NameSpace.Data].film.comments.data;

export const getLoadedCommentsStatus = (state: State): boolean => state[NameSpace.Data].film.comments.isLoaded;

export const getInitialFilms = (state: State): Films => state[NameSpace.Data].initialFilms;

export const getPromoFIlm = (state: State): Film => state[NameSpace.Data].promoFilm;

export const getError = (state: State): string => state[NameSpace.Data].error;
