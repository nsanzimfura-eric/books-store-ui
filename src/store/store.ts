import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../ui/cartComponent/cartSlice";

const store = configureStore({
  reducer: {
    cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
