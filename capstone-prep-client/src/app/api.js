import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://capstone-prep-backend-vjwd.onrender.com/",
    baseUrl: "http://localhost:3000/",

    prepareHeaders: (headers) => {
      const token = window.sessionStorage.getItem("Token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        // headers.set("Access-Control-Allow-Origin", "*");
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (credentials) => ({
        url: "/api/user/register",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["User"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/user/login",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["User"],
    }),
  }),
});

const registrationSlice = createSlice({
  name: "registration",
  initialState: {},
  reducers: {
    setToken: ({ payload }) => {
      window.sessionStorage.setItem("Token", payload.token);
    },

    clearToken: () => {
      window.sessionStorage.removeItem("Token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.registration.matchFulfilled, setToken);
  },
});

const loginSlice = createSlice({
  name: "login",
  initialState: {},
  reducers: {
    setLoginToken: ({ payload }) => {
      window.sessionStorage.setItem("Token", payload.token);
    },

    clearLoginToken: () => {
      window.sessionStorage.removeItem("Token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, setToken);
  },
});

export const { useRegistrationMutation, useLoginMutation } = api;

export const { setToken, clearToken } = registrationSlice.actions;
export const { setLoginToken, clearLoginToken } = loginSlice.actions;

export default {
  registrationSlice: registrationSlice.reducer,
  loginSlice: loginSlice.reducer,
};
