import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { UserComment } from '../../types/comment';
import { Guitar } from '../../types/guitar';

type InitialState = {
  guitar: Guitar | null,
  comments: UserComment[],
  commentsCount: number | null,
};

const initialState: InitialState = {
  guitar: null,
  comments: [],
  commentsCount: null,
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
      state.commentsCount = action.payload.length;
    },
    updateComments: (state, action) => {
      state.comments = [...state.comments, action.payload];
      (state.commentsCount === null) ? state.commentsCount = 1 : state.commentsCount = state.commentsCount + 1;
    },
  },
});

export const { loadGuitarData, loadGuitarComments, updateComments } = currentGuitar.actions;

