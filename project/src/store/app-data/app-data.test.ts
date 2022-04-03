import { Comments } from '../../types/comment';
import { Film, Films } from '../../types/film';
import { makeFakeComments, makeFakeFilm, makeFakeFilms} from '../../utils/mocks';
import { appData, loadComments, loadFavoriteFilms, loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms, setError } from './app-data';

describe('Reducer: appData', () => {
  const state = {
    film: {
      data: {} as Film,
      isLoaded: false,
      similarFilms: [] as Films,
      isFound: 'UNKNOWN',

      comments: {
        data: {} as Comments,
        isLoaded: false,
      },
    },

    favoriteFilms: {
      data: [] as Films,
      isLoaded: false,
    },

    films: {
      data: [] as Films,
      isLoaded: false,
      filteredFilmsByGenre: [] as Films,
    },

    initialFilms: [] as Films,

    promoFilm: {} as Film,

    error: '',
  };

  it('Следует получить промо фильм - loadPromoFilm', () => {
    const mockFilm = makeFakeFilm();

    expect(appData.reducer(state, loadPromoFilm(mockFilm)))
      .toEqual({...state, promoFilm: mockFilm});
  });

  it('Следует получить список похожих фильмов - loadSimilarFilms', () => {
    const mockFilms = makeFakeFilms(5);

    expect(appData.reducer(state, loadSimilarFilms(mockFilms)))
      .toEqual({...state, film: {...state.film, similarFilms: mockFilms}});
  });

  it('Следует получить список фильмов к просмотру - loadFavoriteFilms', () => {
    const mockFilms = makeFakeFilms(5);

    expect(appData.reducer(state, loadFavoriteFilms({data: mockFilms})))
      .toEqual({...state, favoriteFilms: {data: mockFilms, isLoaded: true}});
  });

  it('Следует получить фильм при успешной загрузки с сервера - loadFilm', () => {
    const mockFilm = makeFakeFilm();

    expect(appData.reducer(state, loadFilm({data: mockFilm, isLoaded: true, isFound: true})))
      .toEqual({...state, film: {...state.film, data: mockFilm, isLoaded: true, isFound: true}});
  });

  it('Следует получить список фильмов - loadFilms', () => {
    const mockFilms = makeFakeFilms(5);

    expect(appData.reducer(state, loadFilms({data: mockFilms})))
      .toEqual({...state, films: {...state.films, data: mockFilms, isLoaded: true}, initialFilms: mockFilms});
  });

  it('Следует получить список комментариев - loadComments', () => {
    const mockComments = makeFakeComments(5);

    expect(appData.reducer(state, loadComments(mockComments)))
      .toEqual({...state, film: {...state.film, comments: {data: mockComments, isLoaded: true}}});
  });

  it('Следует получить ошибку - setError', () => {
    const error = 'error';

    expect(appData.reducer(state, setError(error)))
      .toEqual({...state, error: error});
  });

});
