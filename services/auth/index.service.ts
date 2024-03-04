import { baseQueryWithReauth } from "@/constant";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
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
  }),
});
