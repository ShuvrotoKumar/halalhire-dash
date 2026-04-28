import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (params) => ({
        url: "/user/find_by_user_growth",
        method: "GET",
        params: {
          ...params,
        },
      }),
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: ({ userId, page = 1, limit = 5 }) => ({
        url: "/auth/find_by_admin_all_users",
        method: "GET",
        params: {
          ...(userId && { userId }),
          page,
          limit,
        },
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (userId) => {
        return {
          url: `/auth/block-user?userId=${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `dashboard/delete-user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
