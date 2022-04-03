import { DEFAULT_GENRE } from '../../const';
import { makeFakeFilms } from '../../utils/mocks';
import { appProcess, choiceGenre, filterFilmsByGenre, resetShowedFilmsCount, showMore } from './app-process';

describe('Reducer: appProcess', () => {
  const state = {showedFilmsCount: 0, activeGenre: '', filteredFilmsByGenre: [], isDisabledForm: false};

  it('Следует увеличить число фильмов для показа', () => {
    expect(appProcess.reducer(state, showMore()))
      .toEqual({showedFilmsCount: 8, activeGenre: '', filteredFilmsByGenre: []});
  });

  it('Следует сбросить число фильмов для показа', () => {
    expect(appProcess.reducer({...state, showedFilmsCount: 15}, resetShowedFilmsCount()))
      .toEqual({...state, showedFilmsCount: 8});

    expect(appProcess.reducer({...state, showedFilmsCount: 10}, resetShowedFilmsCount()))
      .toEqual({...state, showedFilmsCount: 8});

    expect(appProcess.reducer({...state, showedFilmsCount: 23}, resetShowedFilmsCount()))
      .toEqual({...state, showedFilmsCount: 8});
  });

  it('Следует установить активный жанр', () => {
    expect(appProcess.reducer(state, choiceGenre('Comedy')))
      .toEqual({showedFilmsCount: 8, activeGenre: 'Comedy', filteredFilmsByGenre: []});
  });

  describe('Фильтр фильмов по жанру', () => {
    it('Следует получить все фильмы', () => {
      const mockFIlms = makeFakeFilms(10);

      expect(appProcess.reducer({...state, showedFilmsCount: 16, activeGenre: DEFAULT_GENRE}, filterFilmsByGenre(mockFIlms)))
        .toEqual({...state, showedFilmsCount: 16, activeGenre: DEFAULT_GENRE, filteredFilmsByGenre: mockFIlms});
    });

    it('Следует получить фильмы с жанром Comedy', () => {
      const mockFIlms = makeFakeFilms(10);

      expect(appProcess.reducer({...state, showedFilmsCount: 16, activeGenre: 'Comedy'}, filterFilmsByGenre(mockFIlms)))
        .toEqual({...state, showedFilmsCount: 16, activeGenre: 'Comedy', filteredFilmsByGenre: mockFIlms.filter((film) => film.genre === 'Comedy')});
    });
  });

});
