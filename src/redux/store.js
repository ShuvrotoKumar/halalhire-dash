import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import { authSlice } from "./Slice/authSlice";
const persistConfig = {
  key: "BAZARYA-app",
  storage,
  blacklist: ["baseApi"], // Prevent persisting API cache
  migrate: (state) => {
    // Remove old keys that don't exist in current store
    if (state && state.registration) {
      delete state.registration;
    }
    return Promise.resolve(state);
  },
};

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);
