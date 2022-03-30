import { NameSpace } from '../../const';
import { Comments } from '../../types/comment';
import { Film, Films } from '../../types/film';
import { State, Unknown } from '../../types/state';

export const getFilms = (state: State): Films => state[NameSpace.data].films.data;

export const getFavoriteFilms = (state: State): Films => state[NameSpace.data].fovoriteFilms.data;

export const getFavoriteFilmsStatus = (state: State): boolean => state[NameSpace.data].fovoriteFilms.isLoaded;

export const getLoadedFilmsStatus = (state: State): boolean => state[NameSpace.data].films.isLoaded;

export const getFilm = (state: State): Film => state[NameSpace.data].film.data;

export const getLoadedFilmStatus = (state: State): boolean => state[NameSpace.data].film.isLoaded;

export const getSimilarFilms = (state: State): Films => state[NameSpace.data].film.similarFilms;

export const getFoundedFilmStatus = (state: State): boolean | Unknown => state[NameSpace.data].film.isFound;

export const getComments = (state: State): Comments => state[NameSpace.data].film.comments.data;

export const getLoadedCommentsStatus = (state: State): boolean => state[NameSpace.data].film.comments.isLoaded;

export const getInitialFilms = (state: State): Films => state[NameSpace.data].initialFilms;

export const getPromoFIlm = (state: State): Film => state[NameSpace.data].promoFilm;


