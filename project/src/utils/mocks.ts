import { Film, Films } from '../types/film';
import { Comment, Comments } from '../types/comment';
import {name, datatype, image, internet, lorem} from 'faker';
import { UserData } from '../types/user-data';

const getRandomElement = (elements: string[]) => {
  const randomNumber = Math.floor(Math.random() * elements.length);

  return elements[randomNumber];
};

const genres = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Thriller',
];

export const makeFakeFilm = (): Film => ({
  id: datatype.number(),
  name: name.title(),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: internet.color(),
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
  description: lorem.paragraph(),
  rating: datatype.number(),
  scoresCount: datatype.number(),
  director: name.firstName(),
  starring: Array.from({length: 3}, name.firstName),
  runTime: datatype.number(),
  genre: getRandomElement(genres),
  released: datatype.number(),
  isFavorite: datatype.boolean(),
} as Film);

export const makeFakeFilms = (count: number): Films => (Array.from({length: count}, makeFakeFilm) as Films);

const makeFakeComment = (): Comment => ({
  comment: lorem.paragraph(),
  date: datatype.string(),
  id: datatype.number(),
  rating: datatype.number(),
  user: {
    id: datatype.number(),
    name: name.title(),
  },
} as Comment);

export const makeFakeComments = (count: number): Comments => (Array.from({length: count}, makeFakeComment) as Comments);

export const makeFakeUserData = (): UserData => ({
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  id: datatype.number(),
  name: name.title(),
  token: name.title(),
} as UserData);

