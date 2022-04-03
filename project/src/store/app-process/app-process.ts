import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_GENRE, FILMS_PER_PAGE, NameSpace } from '../../const';
import { Film, Films } from '../../types/film';
import { AppProcess } from '../../types/state';

const initialState: AppProcess = {
  activeGenre: DEFAULT_GENRE,
  showedFilmsCount: FILMS_PER_PAGE,
  filteredFilmsByGenre: [] as Films,
  isDisabledForm: false,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    filterFilmsByGenre: (state, action) => {
      state.filteredFilmsByGenre = state.activeGenre === DEFAULT_GENRE ? action.payload : action.payload.filter((film: Film) => film.genre === state.activeGenre);
    },
    choiceGenre: (state, action) => {
      state.showedFilmsCount = FILMS_PER_PAGE;
      state.activeGenre = action.payload;
    },
    showMore: (state) => {
      state.showedFilmsCount = state.showedFilmsCount + FILMS_PER_PAGE;
    },
    resetShowedFilmsCount: (state) => {
      state.showedFilmsCount = FILMS_PER_PAGE;
    },
    enableForm: (state) => {
      state.isDisabledForm = false;
    },
    disableForm: (state) => {
      state.isDisabledForm = true;
    },
  },
});

export const {choiceGenre, resetShowedFilmsCount, showMore, filterFilmsByGenre, disableForm, enableForm} = appProcess.actions;
