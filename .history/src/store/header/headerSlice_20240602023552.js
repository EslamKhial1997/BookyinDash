import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";


let initialState = {
  isLoading: false,
  data: [],
  itemsCount: 0,
  pages: 0,
  error: null,
};

export const getheader = createAsyncThunk(
  "header/getHeader",
  async (args, thunkApi) => {
  
    try {
  
     
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/header/`
  
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateChallenge = createAsyncThunk(
  "header/updateHeader",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/v1/challenges/${args.id}`,
        args.values
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const headerSlice = createSlice({
  name: "header",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(updateChallenge.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateChallenge.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexAt = state.data.findIndex(
          (el) => el._id === payload.challenge._id
        );
        state.data[indexAt] = payload.challenge;
        state.error = null;
      })
      .addCase(updateChallenge.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      });
  },
});

export default headerSlice.reducer;
