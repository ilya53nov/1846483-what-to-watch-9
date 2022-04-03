import {createAction} from '@reduxjs/toolkit';
import {Action} from '../const';

export const redirectToRoute = createAction<string>(Action.Redirect);
