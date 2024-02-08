import { createSlice } from "@reduxjs/toolkit";
import { CartInterface } from "../../utils/interfaces";

interface CartInterfaceLocal {
  cart: CartInterface[];
}
const initialState: CartInterfaceLocal = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUpdateCart: (state, actions) => {
      state.cart = actions.payload;
    },
  },
});

export const { setUpdateCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
