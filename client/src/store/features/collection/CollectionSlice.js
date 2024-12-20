  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import toast from "react-hot-toast";

const initialState = {
  collections: [],
  loading: false,
  error: null,
  userDetails: {
    username: "",
    userId: "",
  },
};

export const signUp = createAsyncThunk(
  "users/signup",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/signup`,
        { username, password }
      );
      toast.success("Signed up successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to sign up"
      );
    }
  }
);

export const logIn = createAsyncThunk(
  "users/signin",
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/signin`,
        { username, password }
      );
      toast.success("Logged in successfully!");
      const { username: userName, userId } = response.data;

      dispatch(updateUserDetails({ username: userName, userId }));

      navigate("/content");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
      console.error(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to log in"
      );
    }
  }
);

  export const addCollection = createAsyncThunk(
    "collection/add",
    async ({ title, content, link, userId, token }, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_PRODUCTION_URL}/api/v1/user/addcollection`,
          { title, content, link, userId },
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
  reducers: {
    updateUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
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

export const { updateUserDetails } = collectionSlice.actions;
export default collectionSlice.reducer;
