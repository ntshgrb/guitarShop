import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { guitars } from './guitars';
import { currentGuitar } from './current-guitar';
import { utils } from './utils';

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitars.reducer,
  [NameSpace.currentGuitar]: currentGuitar.reducer,
  [NameSpace.utils]: utils.reducer,
});

