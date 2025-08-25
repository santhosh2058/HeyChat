// test-utils/render.jsx
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/authSlice";

export function render(ui, { preloadedState, store } = {}) {
  if (!store) {
    store = configureStore({
      reducer: { auth: authReducer },
      preloadedState,
    });
  }

  return rtlRender(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });
}
