import { baseApi } from "./baseApi";

const privacyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPrivacy: builder.query({
      query: () => ({
        url: "home/get-privacy-policy",
        method: "GET",
      }),
      providesTags: ["privacy"],
    }),
    createPrivacy: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/privacy_policys",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    createAboutUs: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/about",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery, useCreatePrivacyMutation, useCreateAboutUsMutation } = privacyApi;
