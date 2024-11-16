import { configureStore } from "@reduxjs/toolkit";
import { PizzaSlice } from "./PizzaSlice";


export const store = configureStore({
    reducer:PizzaSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

