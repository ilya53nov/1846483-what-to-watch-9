import { Comment } from '../types/comment';

export const comments: Comment[] = [
  {
    id: 1,
    user: {
      id: 16,
      name: 'Mollie',
    },
    rating: 9.7,
    comment: 'I love this movie. This film is a milestone in cinematography. Great Immersive camera-work. This film is an experience and i has already seen it 4 times and I only see more quality of the film.',
    date: '2022-02-13T15:13:26.388Z',
  },
  {
    id: 2,
    user: {
      id: 12,
      name: 'Isaac',
    },
    rating: 6.5,
    comment: 'This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.',
    date: '2022-01-23T15:13:26.388Z',
  },
  {
    id: 3,
    user: {
      id: 19,
      name: 'Christina',
    },
    rating: 5,
    comment: 'This movie really touched my heart, it really is the best movie of the year and everyone should see this masterpiece.',
    date: '2022-01-23T15:13:26.388Z',
  },
  {
    id: 4,
    user: {
      id: 10,
      name: 'Max',
    },
    rating: 2.4,
    comment: 'Poised to be an instant classic, almost everything about this film is phenomenal - the acting, the cinematography, the discography, etc.',
    date: '2022-01-19T15:13:26.388Z',
  },
];
