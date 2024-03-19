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

export const webhooksApi = createApi({
  reducerPath: "webhooks",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createWebhook: builder.mutation({
      query: (body) => ({
        url: "/api/v1/users/webhooks",
        method: "POST",
        body,
      }),
    }),
    readAllWebhooks: builder.query({
      query: () => ({
        url: "/api/v1/users/webhooks",
        method: "GET",
      }),
    }),
    readWebhook: builder.query({
      query: (webhook_id) => ({
        url: `/api/v1/users/webhooks/${webhook_id}`,
        method: "GET",
      }),
    }),
    deleteWebhook: builder.mutation({
      query: (webhook_id) => ({
        url: `/api/v1/users/webhooks/${webhook_id}`,
        method: "DELETE",
      }),
    }),
    updateWebhook: builder.mutation({
      query: ({ webhook_id, ...body }) => ({
        url: `/api/v1/users/webhooks/${webhook_id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useCreateWebhookMutation,
  useReadAllWebhooksQuery,
  useReadWebhookQuery,
  useDeleteWebhookMutation,
  useUpdateWebhookMutation,
} = webhooksApi;
