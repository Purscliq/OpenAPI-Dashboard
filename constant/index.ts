import {
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: async (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
  },
});


export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus || result?.error?.status === 401) {
  }

  return result;
};
