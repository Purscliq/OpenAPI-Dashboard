import { baseQueryWithReauth } from "@/constant";
import { logOut, updateUser } from "@/slice/userSlice";
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
    profile: builder.query({
      query: () => ({
        url: "api/v1/users/user/1",
        method: "GET",
      }),
  
    }),

    validateOtp: builder.mutation({
      query: ({ otp_token, user_email }) => ({
        url: `/api/v1/users/verify?token=${otp_token}&user_email=${user_email}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useProfileQuery,
  useLazyProfileQuery,
  useLoginMutation,
  useValidateOtpMutation,
} = authApi;
