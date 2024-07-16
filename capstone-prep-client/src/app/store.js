import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./api";
import loginReducer from "./api";
import { api } from "./api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    registration: registrationReducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
