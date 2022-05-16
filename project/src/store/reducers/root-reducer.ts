import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaces } from '../../const';
import { guitars } from './guitars';

export const rootReducer = combineReducers({
  [NameSpaces.guitars]: guitars.reducer,
});
