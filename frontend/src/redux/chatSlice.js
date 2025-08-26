import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Async thunk
export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async ( token, { rejectWithValue }) => {
    try {
      if (!token) throw new Error("Token not provided");
      const res = await axios.get(`${BASE_URL}/api/chat`, {
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
  console.error("Error parsing chats from local storage:", e);
  savedChats = [];
}

const initialState = {
  chats: savedChats,
  loading: false,
  error: null,
  selectedChat: null
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
      state.selectedChat = null;
      localStorage.removeItem("chats");
    },
    setSelectedChat: (state, action) => {  
      state.selectedChat = action.payload;
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
export const { clearChats,setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
