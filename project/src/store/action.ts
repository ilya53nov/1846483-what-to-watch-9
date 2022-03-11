import { createAction } from '@reduxjs/toolkit';
import { Action } from '../const';


export const choiceGenre = createAction(Action.ChoiceGenre, (genre) => ({
  payload: genre,
}));
