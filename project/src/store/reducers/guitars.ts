import { createSlice } from '@reduxjs/toolkit';
import { Guitar, GuitarData } from '../../types/guitar';
import { NameSpace } from '../../const';

type InitialState = {
  guitarsList: Guitar[],
  guitarsCount: number;
  loading: boolean;
  currentCatalogPage: number;
  currentGuitarData: GuitarData;
}


const initialState: InitialState = {
  guitarsList: [],
  guitarsCount: 0,
  loading: true,
  currentCatalogPage: 1,
  currentGuitarData: {
    guitar: null,
    comments: [],
  },
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
    loadGuitarData: (state, action) => {
      state.currentGuitarData.guitar = action.payload.guitarData;
      state.currentGuitarData.comments = action.payload.userComments;

    },
    updateComments: (state, action) => {
      state.currentGuitarData.comments?.push(action.payload);
    },
  },
});

export const { loadGuitarsList, setCurrentCatalogPage, loadGuitarData, updateComments } = guitars.actions;
