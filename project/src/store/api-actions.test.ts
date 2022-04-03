import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {checkAuthAction, fetchFavoriteFilmsAction, fetchFilmPromoAction, fetchFilmsAction, fetchGetCommentsAction, fetchGetFilmAction, fetchGetSimilarFilmsAction, loginAction, logoutAction} from './api-actions';
import {requireAuthorization} from './user-process/user-process';
import {APIRoute} from '../const';
import {State} from '../types/state';
import { AuthData } from '../types/auth-data';
import { makeFakeComments, makeFakeFilm, makeFakeFilms } from '../utils/mocks';
import { loadComments, loadFavoriteFilms, loadFilm, loadFilms, loadPromoFilm, loadSimilarFilms } from './app-data/app-data';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('Следует получить статус авторизации "auth", при возвращении с сервера кода 200 GET /login', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });

  it('Следует отправить запрос авторизации на сервер POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};
    const token = 'what-to-watch-token';

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(token, 'secret');
  });

  it('Следует отправить запрос деавторизации на сервер DELETE /logout', async () => {
    const token = 'what-to-watch-token';

    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(token);
  });

  it('Следует получить промо фильм GET /promo', async () => {
    const mockPromoFilm = makeFakeFilm();

    mockAPI
      .onGet(APIRoute.PromoFilm)
      .reply(200, mockPromoFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadPromoFilm.toString());
  });

  it('Следует получить список фильмов GET /films', async () => {
    const mockPromoFilms = makeFakeFilms(5);

    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockPromoFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFilms.toString());
  });

  it('Следует получить фильм GET /films/filmId', async () => {
    const mockFilm = makeFakeFilm();

    const idMockFilm = mockFilm.id;

    mockAPI
      .onGet(`${APIRoute.Films}/${idMockFilm}`)
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchGetFilmAction(idMockFilm));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFilm.toString());
  });

  it('Следует получить список комментариев GET /comments/filmId', async () => {
    const mockFilm = makeFakeFilm();
    const mockComments = makeFakeComments(5);

    const idMockFilm = mockFilm.id;

    mockAPI
      .onGet(`${APIRoute.Comments}/${idMockFilm}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchGetCommentsAction(idMockFilm));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadComments.toString());
  });

  it('Следует получить список похожих фильмов GET /films/filmId/similar', async () => {
    const mockSimilarFilms = makeFakeFilms(5);

    const mockFilm = makeFakeFilm();

    const idMockFilm = mockFilm.id;

    mockAPI
      .onGet(`${APIRoute.Films}/${idMockFilm}${APIRoute.Similar}`)
      .reply(200, mockSimilarFilms);

    const store = mockStore();

    await store.dispatch(fetchGetSimilarFilmsAction(idMockFilm));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadSimilarFilms.toString());
  });

  it('Следует получить список фильмов для просмотра GET /favorite', async () => {
    const mockFavoriteFilms = makeFakeFilms(5);

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFavoriteFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavoriteFilms.toString());
  });


});
