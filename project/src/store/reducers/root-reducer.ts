import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { guitars } from './guitars';

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitars.reducer,
});
