import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';

type InitialState = {
  addToCartModal: boolean,
}

const initialState: InitialState = {
  addToCartModal: false,
};

export const utils = createSlice({
  name: NameSpace.utils,
  initialState,
  reducers: {
    toggleAddToCartModal: (state, action) => {
      state.addToCartModal = action.payload;
    },
  },
});

export const { toggleAddToCartModal } = utils.actions;
