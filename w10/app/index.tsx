import React from "react";
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import CounterScreen from "./screens/CounterScreen";
import CartScreen from "./screens/CartScreen";
import TodoScreen from "./screens/TodolistScreen";

export default function App() {
  return (
    <Provider store={store}>
      {/* <CounterScreen /> */}
      <CartScreen/>
      {/* <TodoScreen/> */}
    </Provider>
  );
}