import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { getPriceRange } from '../../utils/catalog-filter';

type InitialState = {
  priceRange: {
    minPrice: number | null,
    maxPrice: number | null,
  },
  userPriceRange: {
    userMinPrice: number | null,
    userMaxPrice: number | null,
  }
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
  },
});

export const { setPriceRange, setUserPriceRange } = catalogFilter.actions;

