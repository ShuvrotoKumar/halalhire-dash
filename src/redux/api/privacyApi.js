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
    createCookiePolicy: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/cookie_policy",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    createAccessibility: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/accessibility",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
    createImprint: builder.mutation({
      query: ({ requestData }) => ({
        url: "/setting/imprint",
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ["privacy"],
    }),
  }),
});

export const { useGetPrivacyQuery, useCreatePrivacyMutation, useCreateAboutUsMutation, useCreateCookiePolicyMutation, useCreateAccessibilityMutation, useCreateImprintMutation } = privacyApi;
