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
              apiResponse?.data?.token?.refreshToken
            );
            localStorage.setItem("token", apiResponse.data?.token?.token);
          })
          .catch(() => {});
      },
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/api/v1/login",
        method: "POST",
        body,
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            localStorage.setItem("refresh", apiResponse.data?.refreshToken);
            localStorage.setItem("token", apiResponse.data?.token);
          })
          .catch(() => {});
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
        url: "user/me",
      }),
      // providesTags: ["profile"],
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            dispatch(updateUser(apiResponse?.data?.user));
          })
          .catch(() => {
            dispatch(logOut());
          });
      },
    }),

    validateOtp: builder.mutation({
      query: (body) => ({
        url: "validation/phone/validate/otp",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
