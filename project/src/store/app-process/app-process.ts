import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_GENRE, FILMS_PER_PAGE, NameSpace } from '../../const';
//import { useAppSelector } from '../../hooks';
import { Film, Films } from '../../types/film';
import { AppProcess } from '../../types/state';
//import { getInitialFilms } from '../app-data/selectors';

const initialState: AppProcess = {
  activeGenre: DEFAULT_GENRE,
  showedFilmsCount: FILMS_PER_PAGE,
  filteredFilmsByGenre: [] as Films,
};

export const appProcess = createSlice({
  name: NameSpace.app,
  initialState,
  reducers: {
    filterFilmsByGenre: (state, action) => {
      //const films = action.payload;
      state.filteredFilmsByGenre = state.activeGenre === DEFAULT_GENRE ? action.payload : action.payload.filter((film: Film) => film.genre === state.activeGenre);

      console.log(state.filteredFilmsByGenre, 'state');
      //const initialFilms = getInitialFilms({DATA}: appData);
      //console.log();

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
  },
});

export const {choiceGenre, resetShowedFilmsCount, showMore, filterFilmsByGenre} = appProcess.actions;
