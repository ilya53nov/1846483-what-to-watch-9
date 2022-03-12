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
}

export enum Tab {
  Overview = 'Overview',
  Details = 'Details',
  Reviews = 'Reviews',
}

export const DEFAULT_GENRE = 'All genres';

export const MAX_GENRES = 9;

export const INITIAL_SHOW_FILM_COUNT = 8;
