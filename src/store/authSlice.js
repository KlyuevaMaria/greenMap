import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signup",
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.status = "succeeded";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.message;
      });
  },
});

export default authSlice.reducer;
