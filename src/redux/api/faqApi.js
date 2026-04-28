import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFaq: builder.query({
      query: (params) => ({
        url: "/faq/find_by_all_faq",
        method: "GET",
        params,
      }),
      providesTags: ["faq"],
    }),
    deleteFaq: builder.mutation({
      query: ({ _id }) => ({
        url: `/faq/delete_faq/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create_faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["faq"],
    }),
    // updateFaq: builder.mutation({
    //   query: ({ _id, data }) => {
    //     // console.log("Updating FAQ:", { _id, data });
    //     return {
    //       url: `faq/update-faq`,
    //       method: "PATCH",
    //       params: { faqId: _id },
    //       body: data,
    //     };
    //   },
    //   invalidatesTags: ["faq"],
    // }),
  }),
});

export const {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
  // useUpdateFaqMutation,
} = faqApi;

export default faqApi;
