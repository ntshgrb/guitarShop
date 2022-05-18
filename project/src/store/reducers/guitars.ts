import { createSlice } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar';
import { NameSpaces } from '../../const';

type InitialState = {
  guitarsList: Guitar[],
  guitarsCount: number;
  loading: boolean;
  currentCatalogPage: number;
}


const initialState: InitialState = {
  guitarsList: [],
  guitarsCount: 0,
  loading: true,
  currentCatalogPage: 1,
};

export const guitars = createSlice({
  name: NameSpaces.guitars,
  initialState,
  reducers: {
    loadGuitarsList: (state, action) => {
      state.guitarsList = action.payload;
      state.guitarsCount = action.payload.length;
      state.loading = false;
    },
  },
});

export const { loadGuitarsList } = guitars.actions;
