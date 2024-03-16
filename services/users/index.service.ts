import { baseQueryWithReauth } from "@/constant";
import { createApi } from "@reduxjs/toolkit/query/react";
import { updateUser } from "@/slice/userSlice";

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
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then((apiResponse) => {
            console.log(apiResponse);
            dispatch(updateUser(apiResponse?.data?.data));
          })
          .catch(() => {
            location.pathname = "/";
          });
      },
    }),
  }),
});

export const { useProfileQuery, useLazyProfileQuery } = userApi;
