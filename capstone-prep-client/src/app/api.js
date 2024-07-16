import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://capstone-prep-backend-vjwd.onrender.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().registration.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
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



export const { useRegistrationMutation } = api;

export const { setToken, clearToken } = registrationSlice.actions;

export default registrationSlice.reducer;
