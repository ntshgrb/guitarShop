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
    decrementQuantity: (state, action) => {
      const productIndex = state.cartList.findIndex((cartItem) => cartItem.id === action.payload.id);
      const productToUpdate = state.cartList[productIndex];
      productToUpdate.quantity = productToUpdate.quantity - 1;

      state.cartList = [...state.cartList.slice(0, productIndex), productToUpdate, ...state.cartList.slice(productIndex + 1)];
    },
    incrementQuantity: (state, action) => {
      const productIndex = state.cartList.findIndex((cartItem) => cartItem.id === action.payload.id);
      const productToUpdate = state.cartList[productIndex];
      productToUpdate.quantity = productToUpdate.quantity + 1;

      state.cartList = [...state.cartList.slice(0, productIndex), productToUpdate, ...state.cartList.slice(productIndex + 1)];
    },
    changeQuantity: (state, action) => {
      const { userQuantity, cartListItem } = action.payload;

      const productIndex = state.cartList.findIndex((cartItem) => cartItem.id === cartListItem.id);
      const productToUpdate = state.cartList[productIndex];
      productToUpdate.quantity = userQuantity;

      state.cartList = [...state.cartList.slice(0, productIndex), productToUpdate, ...state.cartList.slice(productIndex + 1)];
    },
  },
});

export const { addToCart, decrementQuantity, incrementQuantity, changeQuantity } = cart.actions;
