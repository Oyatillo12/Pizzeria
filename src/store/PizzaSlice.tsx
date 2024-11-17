import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Products } from "../components/HomePage/PizzaCard"


interface BoughtType {
    bought: Products[]
}
const initialState: BoughtType = {
    bought: []
}

export const PizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        addPizzaToCart(state, action:PayloadAction<Products>) {
            const productExists = state.bought.some((b: Products) => b.id === action.payload.id);
            if (productExists) {
                state.bought = state.bought.map((b: Products) =>
                    b.id === action.payload.id
                        ? { ...b, count: b.count + 1, price: b.price + action.payload.price }
                        : b
                );
            } else {
                state.bought.push({ ...action.payload, count: 1 });
            }
        },
        removePizzaFromCart(state, action:PayloadAction<number | string>) {
            state.bought = state.bought.filter(pizza => pizza.id !== action.payload)
        },
        minusPizzaFromCart(state, action:PayloadAction<Products>){
            const minus:number = (action.payload.count - action.payload.count) + 1;
            console.log(action.payload.price / action.payload.count );
            
            state.bought = state.bought.map(pizza => pizza.id === action.payload.id
                   ? {...pizza, count: Math.max(pizza.count - 1, 0), price: pizza.price - Math.min(action.payload.price,action.payload.price / action.payload.count) }
                    : pizza
            )
            if(action.payload.count == 1){
                state.bought = state.bought.filter(pizza => pizza.id!== action.payload.id)
            }
        },
        clearShopping(state){
            state.bought = []
        }
    }

})

export const { addPizzaToCart,minusPizzaFromCart, removePizzaFromCart, clearShopping } = PizzaSlice.actions