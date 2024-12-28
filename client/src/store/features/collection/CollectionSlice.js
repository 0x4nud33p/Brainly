  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
 import { toast } from "sonner";

const initialState = {
  collections: [],
  loading: false,
  error: null,
};


  export const addCollection = createAsyncThunk(
    "collection/add",
    async ({ title, content, link, userId, tags, token }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/addcollection`,
          { title, content, link, userId,tags },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Collection added successfully!");
        return response.data;
      } catch (error) {
        toast.error("Error while adding collection");
        return rejectWithValue(
          error.response?.data?.message || "Failed to add collection"
        );
      }
    }
  );

  export const deleteCollection = createAsyncThunk(
    "collection/delete",
    async ({ id, token }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/deletecollection`,
          { contentid: id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success(
          response.data.message || "Collection deleted successfully!"
        );
        return id;
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete collection"
        );
        return rejectWithValue(
          error.response?.data?.message || "Failed to delete collection"
        );
      }
    }
  );

  export const getCollections = createAsyncThunk(
    "collection/fetchAll",
    async ({ userId, token }, { rejectWithValue }) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/getallcollections`,
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return data;
      } catch (error) {
        toast.error("Failed to load collections. Please try again.");
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch collections"
        );
      }
    }
  );

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.collections.push(action.payload);
      })
      .addCase(addCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.collections = state.collections.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.collections = action.payload;
        state.loading = false;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});


export default collectionSlice.reducer;
