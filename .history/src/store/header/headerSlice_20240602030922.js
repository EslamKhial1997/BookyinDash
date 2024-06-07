import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { useParams } from "react-router-dom";

let initialState = {
  isLoading: false,
  data: [],
  itemsCount: 0,
  pages: 0,
  error: null,
};
const params = useParams()
export const getheader = createAsyncThunk(
  "header/getHeader",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/header/${args}`
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateHeader = createAsyncThunk(
  "header/updateHeader",
  async (args, thunkApi) => {
    console.log(args);
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
    .addCase(getheader.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getheader.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.isLoading = false;
      state.data = payload.data;
     
      state.error = null;
    })
    .addCase(getheader.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.msg;
    })
      .addCase(updateHeader.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHeader.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexAt = state.data.findIndex(
          (el) => el._id === payload.challenge._id
        );
        state.data[indexAt] = payload.challenge;
        state.error = null;
      })
      .addCase(updateHeader.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      });
  },
});

export default headerSlice.reducer;
