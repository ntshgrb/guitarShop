import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { guitars } from './guitars';
import { currentGuitar } from './current-guitar';
import { utils } from './utils';
import { catalogFilter } from './catalog-filter';
import { cart } from './cart';

export const rootReducer = combineReducers({
  [NameSpace.guitars]: guitars.reducer,
  [NameSpace.currentGuitar]: currentGuitar.reducer,
  [NameSpace.utils]: utils.reducer,
  [NameSpace.catalogFilter]: catalogFilter.reducer,
  [NameSpace.cart]: cart.reducer,
});

