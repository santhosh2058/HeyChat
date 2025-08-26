import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ token, chatId }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/message/${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching messages");
    }
  }
);

export const createMessage = createAsyncThunk(
  "messages/createMessage",
  async ({ token, chatId, content }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/message`,
        { content, chatId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error creating message");
    }
  }
);

const initialState = {
  messages: JSON.parse(localStorage.getItem("messages")) || [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
        localStorage.setItem("messages", JSON.stringify(state.messages));
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
