import { createSlice } from '@reduxjs/toolkit';
import { Guitar } from '../../types/guitar';
import { NameSpaces } from '../../const';

type InitialState = {
  guitarsList: Guitar[],
}


const initialState: InitialState = {
  guitarsList: [],
};

export const guitars = createSlice({
  name: NameSpaces.guitars,
  initialState,
  reducers: {
    loadGuitarsList: (state, action) => {
      state.guitarsList = action.payload;
    },
  },
});

export const { loadGuitarsList } = guitars.actions;
