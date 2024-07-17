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
      tags: "User",
    }),

    getUser: builder.query({
      query: (id) => `api/user/users/${id}`,
      providesTags: providesId("User"),
      tags: "User",
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: `api/user/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: invalidatesId("User"),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `api/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: invalidatesId("User"),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
