import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (params) => ({
        url: "/auth/create_admin",
        method: "POST",
        body: params, // Use body for POST requests
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, ...updateData }) => ({
        url: "/auth/update_my_profile",
        method: "PATCH",
        params: userId ? { userId } : {}, // Only include userId in params if it exists
        body: updateData, // Send update data in body for PATCH
      }),
      invalidatesTags: ["user"],
    }),
    blockUser: builder.mutation({
      query: (userId) => ({
        url: `/auth/change_status/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["user"],
    }),
    // deleteUser: builder.mutation({
    //   query: (userId) => ({
    //     url: `/dashboard/delete-user/${userId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    
  }),
});

export const {
  useCreateAdminMutation,
  useUpdateUserMutation,
  useBlockUserMutation,
//   useDeleteUserMutation,
} = adminApi;
