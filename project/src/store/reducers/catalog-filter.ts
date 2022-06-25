import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { guitarsTypes } from '../../types/catalog-settings-types';
import { getPriceRange } from '../../utils/catalog-filter';

type InitialState = {
  priceRange: {
    minPrice: number | null,
    maxPrice: number | null,
  },
  userPriceRange: {
    userMinPrice: number | null,
    userMaxPrice: number | null,
  },
  guitarType: guitarsTypes[] | null,
  stringsCount: number[] | null,
}

const initialState: InitialState = {
  priceRange: {
    minPrice: null,
    maxPrice: null,
  },
  userPriceRange: {
    userMinPrice: null,
    userMaxPrice: null,
  },
  guitarType: null,
  stringsCount: null,
};

export const catalogFilter = createSlice({
  name: NameSpace.catalogFilter,
  initialState,
  reducers: {
    setPriceRange: (state, action) => {
      state.priceRange = getPriceRange(action.payload);
    },
    setUserPriceRange: (state, action) => {
      state.userPriceRange = action.payload;
    },
    setGuitarType: (state, action) => {
      state.guitarType = action.payload;
    },
    setStringsCount: (state, action) => {
      state.stringsCount = action.payload;
    },
  },
});

export const { setPriceRange, setUserPriceRange, setGuitarType, setStringsCount } = catalogFilter.actions;

