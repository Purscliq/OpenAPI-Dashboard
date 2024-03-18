import { baseQueryWithReauth } from "@/constant";
import { createApi } from "@reduxjs/toolkit/query/react";

export const apiKeysApi = createApi({
  reducerPath: "apikey",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createApiKey: builder.mutation({
      query: (body) => ({
        url: "/api/v1/auth/api_keys",
        method: "POST",
        body,
      }),
    }),
    getApiKeys: builder.query({
      query: () => ({
        url: "/api/v1/auth/api_keys",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateApiKeyMutation, useGetApiKeysQuery } = apiKeysApi;
