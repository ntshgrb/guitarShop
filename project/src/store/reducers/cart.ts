import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { Cart } from '../../types/cart';

type InitialState = {
  cartList: Cart[],
}

const initialState: InitialState = {
  cartList: [],
};

export const cart = createSlice({
  name: NameSpace.cart,
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList = [ ...state.cartList, {
        id: +action.payload.id,
        product: action.payload,
        quantity: 1,
      },
      ];
    },
  },
});

export const { addToCart } = cart.actions;
