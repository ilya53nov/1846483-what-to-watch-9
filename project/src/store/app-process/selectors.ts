import { NameSpace } from '../../const';
import { Films } from '../../types/film';
import { State } from '../../types/state';

export const getActiveGenre = (state: State): string => state[NameSpace.App].activeGenre;

export const getShowedFilmsCount = (state: State): number => state[NameSpace.App].showedFilmsCount;

export const getFilteredFilmsByGenre = (state: State): Films => state[NameSpace.App].filteredFilmsByGenre;

export const getIsDisabledForm = (state: State): boolean => state[NameSpace.App].isDisabledForm;
