import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import messagesReducer from "./messagesSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    messages: messagesReducer,
  }
});
