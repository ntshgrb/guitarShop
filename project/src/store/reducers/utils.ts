import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

type InitialState = {
  addToCartModal: boolean,
  addToCartSuccess: boolean,
}

const initialState: InitialState = {
  addToCartModal: false,
  addToCartSuccess: false,
};

export const utils = createSlice({
  name: NameSpace.utils,
  initialState,
  reducers: {
    toggleAddToCartModal: (state, action) => {
      state.addToCartModal = action.payload;
    },
    toggleAddToCartSuccess: (state, action) => {
      state.addToCartSuccess = action.payload;
    },
  },
});

export const { toggleAddToCartModal, toggleAddToCartSuccess } = utils.actions;
