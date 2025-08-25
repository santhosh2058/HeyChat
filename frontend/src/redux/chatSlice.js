import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Async thunk
export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async ( token, { rejectWithValue }) => {
    try {
      if (!token) throw new Error("Token not provided");
      const res = await axios.get("http://localhost:5000/api/chat", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })  // backend route
      console.log(res.data);
      return res.data
    } catch (err) {
      return rejectWithValue(err.response?.data || "Error fetching chats")
    }
  }
)

let savedChats = [];

try {
  const rawChats = localStorage.getItem("chats");
  savedChats =
    rawChats && rawChats !== "undefined" ? JSON.parse(rawChats) : [];
} catch (e) {
  savedChats = [];
}

const initialState = {
  chats: savedChats,
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
      localStorage.setItem("chats", JSON.stringify(action.payload));
    },
    clearChats: (state) => {
      state.chats = [];
      localStorage.removeItem("chats");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false
        state.chats = action.payload
        localStorage.setItem("chats", JSON.stringify(action.payload));
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})
export const { clearChats } = chatSlice.actions;
export default chatSlice.reducer;
