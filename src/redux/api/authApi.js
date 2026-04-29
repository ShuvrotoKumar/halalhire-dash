import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    logIn: builder.mutation({
      query: (data) => {
        console.log("Data being sent to the API:", data);
        return {
          url: "/auth/login_user",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["admin"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/user/forgot_password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/user/verification_forgot_user",
        method: "PATCH",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/user/reset_password",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: localStorage.getItem("resetToken"),
        },
      }),

      invalidatesTags: ["admin"],
    }),
    resendOtp: builder.query({
      query: (email) => ({
        url: `/user/resend_verification_otp/${email}`,
        method: "GET",
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/change_password",
        method: "PATCH",
        body: data,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }),

      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useLogInMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useResendOtpQuery,
  useLazyResendOtpQuery,
  useChangePasswordMutation,
} = authApi;

export default authApi;
