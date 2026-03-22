import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import cartReducer from './cartSlice';
import todoReducer from './todoSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        cart: cartReducer,
        todo: todoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;