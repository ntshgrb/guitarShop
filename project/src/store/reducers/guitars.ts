import { createSlice } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar';
import { NameSpace } from '../../const';
import { UserComment } from '../../types/comment';

type InitialState = {
  guitarsList: Guitar[],
  guitarsCount: number;
  guitarsComments: {[id: string]: UserComment[]} [],
  loading: boolean;
  currentCatalogPage: number;
}


const initialState: InitialState = {
  guitarsList: [],
  guitarsCount: 0,
  guitarsComments: [],
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
    loadComments: (state, action) => {
      state.guitarsComments = { ...state.guitarsComments, [action.payload.guitarId]: action.payload.userComments };
    },
    setCurrentCatalogPage: (state, action) => {
      state.currentCatalogPage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { loadGuitarsList, setCurrentCatalogPage, setLoading, loadComments } = guitars.actions;
