import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "@/utils/axios";
import { filterRequest } from "@/utils/apiManager";

let initialState = {
  isLoading: false,
  data: [],
  itemsCount: 0,
  pages: 0,
  error: null,
}

export const getCategories = createAsyncThunk(
  "categories",
  async (args, thunkApi) => {
    try {
      // const { page = 1, size = 10, search = "" } = args;
      // const filter = filterRequest(args.filter);
      /* ?page=${page}&size=${size}&search=${search}${filter} */
      const { data } = await axios.get(`http://localhost:8000/api/v1/category`);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const createCategory = createAsyncThunk(
  "http://localhost:8000/v1/categories",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.post("http://localhost:8000/v1/categories", args);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(`http://localhost:8000/v1/categories/${args.id}`, args.values);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.delete(`http://localhost:8000/v1/categories/${args.id}`);
      return thunkApi.fulfillWithValue(data);
    } catch (e) {
      return thunkApi.rejectWithValue(e.response.data);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        state.data = payload.data;
        state.itemsCount = payload.itemsCount;
        state.pages = payload.pages;
        state.error = null;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg
      })

      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data.push(payload.category);
        state.itemsCount++;
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg
      })

      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const indexAt = state.data.findIndex(el => el._id === payload.category._id);
        state.data[indexAt] = payload.category;
        state.error = null;

      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg
      })

      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = state.data.filter(el => el._id !== payload.category._id);
        state.itemsCount--;
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload.msg
      })
  }
});

export default categoriesSlice.reducer;