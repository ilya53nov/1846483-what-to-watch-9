import { NameSpace } from '../../const';
import { Films } from '../../types/film';
import { State } from '../../types/state';

export const getActiveGenre = (state: State): string => state[NameSpace.app].activeGenre;

export const getShowedFilmsCount = (state: State): number => state[NameSpace.app].showedFilmsCount;

export const getFilteredFilmsByGenre = (state: State): Films => state[NameSpace.app].filteredFilmsByGenre;
