import { baseQueryWithReauth } from "@/constant";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "api/v1/users/register",
        method: "POST",
        body,
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            localStorage.setItem(
              "refresh",
              apiResponse.data?.data?.token.refresh_token
            );
            localStorage.setItem(
              "token",
              apiResponse.data?.data?.token?.access_token
            );
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body,
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            localStorage.setItem(
              "refresh",
              apiResponse.data?.data?.token.refresh_token
            );
            localStorage.setItem(
              "token",
              apiResponse.data?.data?.token?.access_token
            );
          })
          .catch((error) => {
            console.log(error);
          });
      },
    }),

    refresh: builder.mutation({
      query: (body) => ({
        url: "login/refresh",
        method: "POST",
        body,
      }),
    }),

    validateOtp: builder.mutation({
      query: ({ otp_token, user_email }) => ({
        url: `/api/v1/users/verify?token=${otp_token}&user_email=${user_email}`,
        method: "POST",
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/update-forgotten-password",
        method: "POST",
        body,
      }),
    }),
    enable2fa: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/enable-2fa",
        method: "POST",
      }),
    }),
    generate2fa: builder.query({
      query: () => ({
        url: "/api/v1/auth/generate-qr",
        method: "GET",
      }),
    }),
    validate2fa: builder.mutation({
      query: ({code}) => ({
        url: `/api/v1/auth/verify-totp?totp_code=${code}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useValidateOtpMutation,
  useResetPasswordMutation,
  useEnable2faMutation,
  useLazyGenerate2faQuery,
  useValidate2faMutation

} = authApi;
