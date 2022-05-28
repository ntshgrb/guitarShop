import { createSlice } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar';
import { NameSpace } from '../../const';

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
  name: NameSpace.guitars,
  initialState,
  reducers: {
    loadGuitarsList: (state, action) => {
      state.guitarsList = action.payload;
      state.guitarsCount = action.payload.length;
      state.loading = false;
    },
    setCurrentCatalogPage: (state, action) => {
      state.currentCatalogPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loadGuitarsList, setCurrentCatalogPage, setLoading } = guitars.actions;
