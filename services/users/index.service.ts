import { baseQueryWithReauth } from "@/constant";
import { createApi } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => ({
        url: "api/v1/users/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useProfileQuery, useLazyProfileQuery } = userApi;
