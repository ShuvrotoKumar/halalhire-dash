/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../config/envConfig";

// Helper function to get the auth token
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl(),
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("🔍 Token from Redux state:", token);
      if (token) {
        // Try without Bearer prefix first
        headers.set("Authorization", token);
        console.log("✅ Authorization header set (without Bearer):", token);
      } else {
        console.log("❌ No token found in Redux state");
        // Check localStorage as fallback
        const localStorageToken = localStorage.getItem("BAZARYA-app");
        console.log("🔍 localStorage token:", localStorageToken);
        if (localStorageToken) {
          try {
            const parsed = JSON.parse(localStorageToken);
            if (parsed.auth && parsed.auth.token) {
              console.log("✅ Found token in localStorage, setting header");
              headers.set("Authorization", parsed.auth.token);
            }
          } catch (e) {
            console.log("❌ Failed to parse localStorage");
          }
        }
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "admin",
    "dashboard",
    "user",
    "termsAndConditions",
    "faq",
    "privacy",
    "categories",
    "formation",
    "coupon",
    "earning",
    "subscriber",
    "subscription",
    "profile",
    "category",
    "listings",
    "notification",
    "NDA",
  ],
});
