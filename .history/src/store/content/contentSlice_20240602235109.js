import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axios";
import { filterRequest } from "@/utils/apiManager";

let initialState = {
  isLoading: false,
  data: [],
  itemsCount: 0,
  pages: 0,
  error: null,
};

export const getContent = createAsyncThunk(
  "content/getcontent",
  async (args, thunkApi) => {
    try {
      const { page = 1, size = 10, search = "" } = args;
      const filter = filterRequest(args.filter);
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/header`
        // ?page=${page}&size=${size}&search=${search}${filter}`
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const createContent = createAsyncThunk(
  "content/createContent",
  async (args, thunkApi) => {
    console.log(args.image[0]);
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/header", {
        title:args.title,
        subtitle:args.subtitle,
        image:args.image[0],
        logo:args.logo[0]
      },{
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "multipart/form-data",
        }
      });
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateContent = createAsyncThunk(
  "content/updateContent",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/v1/content/${args.id}`,
        args.values
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const deleteContent = createAsyncThunk(
  "content/deleteContent",
  async (args, thunkApi) => {
    console.log(args);
    try {
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/header/${args._id}`
      );
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getcontent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getcontent.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.data = payload.data;
        state.itemsCount = payload.itemsCount;
        state.pages = payload.pages;
        state.error = null;
      })
      .addCase(getcontent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })

      .addCase(createContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createContent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.push(payload.Content);
        state.itemsCount++;
        state.error = null;
      })
      .addCase(createContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })

      .addCase(updateContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateContent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexAt = state.data.findIndex(
          (el) => el._id === payload.Content._id
        );
        state.data[indexAt] = payload.Content;
        state.error = null;
      })
      .addCase(updateContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      })

      .addCase(deleteContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContent.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (el) => el._id !== payload.Content._id
        );
        state.itemsCount--;
        state.error = null;
      })
      .addCase(deleteContent.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg;
      });
  },
});

export default contentSlice.reducer;
