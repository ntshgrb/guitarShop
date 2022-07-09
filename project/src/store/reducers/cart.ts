import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CartItem } from '../../types/cart-item';

type InitialState = {
  cartList: CartItem[],
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