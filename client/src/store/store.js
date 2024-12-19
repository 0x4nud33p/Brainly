import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from "./features/collection/CollectionSlice";

export const store = configureStore({
  reducer: {
    collection: collectionReducer,
  },
});
