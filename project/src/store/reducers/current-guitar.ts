import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { UserComment } from '../../types/comment';
import { Guitar } from '../../types/guitar';

type InitialState = {
  guitar: Guitar | null,
  comments: UserComment[],
};

const initialState: InitialState = {
  guitar: null,
  comments: [],
};

export const currentGuitar = createSlice({
  name: NameSpace.currentGuitar,
  initialState,
  reducers: {
    loadGuitarData: (state, action) => {
      state.guitar = action.payload;
    },
    loadGuitarComments: (state, action) => {
      state.comments = action.payload;
    },
    updateComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { loadGuitarData, loadGuitarComments, updateComments } = currentGuitar.actions;

