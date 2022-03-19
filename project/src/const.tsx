export enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Action {
  ChoiceGenre = 'Choice genre',
  ShowMore = 'Show more',
  ResetShowedFilmsCount = 'Reset showed films count',
  RequireAuthorization = 'Require authorization',
  SetError = 'Set error',
  LoadFilms = 'Load films',
  LoadSimilarFilms = 'Load similar films',
  LoadFilm = 'Load film',
  LoadPromoFilm = 'Load promo film',
  LoadComments = 'Load comments',
  Login = 'Login',
  Logout = 'Logout',
  AddComment = 'Add comment',
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Films = '/films',
  PromoFilm = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Similar = '/similar',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const BACKEND_URL = 'https://9.react.pages.academy/wtw';

export const REQUEST_TIMEOUT = 5000;

export const TIMEOUT_SHOW_ERROR = 2000;

export const DEFAULT_GENRE = 'All genres';

export const MAX_GENRES = 9;

export const FILMS_PER_PAGE = 8;

export const MAX_RATING = 10;

export const MIN_RATING = 1;

export const DEFAULT_RATING = 8;

export const DEFAULT_COMMENT = '';

export const DEFAULT_MUTE = true;

export const WAIT_TIME_MS = 1000;
