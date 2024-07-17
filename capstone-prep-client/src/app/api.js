import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://capstone-prep-backend-vjwd.onrender.com/",

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
  endpoints: () => ({}),
});

const registrationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (credentials) => ({
        url: "/api/user/register",
        method: "POST",
        body: credentials,
      }),
      invalidateTags: ["User"],
    }),
  }),
});

const loginApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
    builder.addMatcher(api.endpoints.login.matchFulfilled, setLoginToken);
  },
});

//******************************* */
// From Classroom Manager Example for use in user update/display/delete
export function providesList(tagType) {
  return (resultsWithIds) => {
    console.log(resultsWithIds);
    resultsWithIds
      ? [
          { type: tagType, id: "LIST" },
          ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
        ]
      : [{ type: tagType, id: "LIST" }];
  };
}

export function providesId(tagType) {
  return (result, error, id) => [{ type: tagType, id }];
}

export function invalidatesId(tagType) {
  return (result, error, arg) => [{ type: tagType, id: arg.id }];
}
//******************************** */

export const { useRegistrationMutation, useLoginMutation } = api;

export const { setToken, clearToken } = registrationSlice.actions;
export const { setLoginToken, clearLoginToken } = loginSlice.actions;

export default {
  registrationSlice: registrationSlice.reducer,
  loginSlice: loginSlice.reducer,
};
