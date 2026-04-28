import { baseApi } from "./baseApi";

const termsAndConditionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "home/get-terms-condition",
        method: "GET",
      }),
      providesTags: ["termsAndConditions"],
    }),
    createTermsAndConditions: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/terms_conditions",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["termsAndConditions"],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useCreateTermsAndConditionsMutation,
} = termsAndConditionsApi;
