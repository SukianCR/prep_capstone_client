import { api, invalidatesId, providesId, providesList } from "../app/api";

/**
 * API endpoints
 */
const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "api/user/users",
      // needs debugging --- >
      //providesTags: providesList("User"),
      providesTags: ["User"],
    }),

    getUser: builder.query({
      query: (id) => `api/user/users/${id}`,
      //providesTags: providesId("User"),
      providesTags: ["User"],
    }),

    updateUser: builder.mutation({
      query: (user) => ({
        url: `api/user/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
    
      invalidatesTags: ["User"],
    }),
    
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
