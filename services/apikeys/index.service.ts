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
    deleteApiKey: builder.mutation({
      query: () => ({
        url: "/api/v1/auth/api_keys/1",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateApiKeyMutation,
  useGetApiKeysQuery,
  useDeleteApiKeyMutation,
} = apiKeysApi;

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

export const whitelistApi = createApi({
  reducerPath: "whitelist",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    whitelistIp: builder.mutation({
      query: (body) => ({
        url: "/api/v1/users/ip-address/whitelist",
        method: "POST",
        body,
      }),
    }),
    getAllIps: builder.query({
      query: () => ({
        url: "/api/v1/users/ip-address",
        method: "GET",
      }),
    }),
    getIp: builder.query({
      query: (ip_address_id) => ({
        url: `/api/v1/users/ip-address/${ip_address_id}`,
        method: "GET",
      }),
    }),
    deleteIp: builder.mutation({
      query: (ip_address_id) => ({
        url: `/api/v1/users/ip-address/${ip_address_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useWhitelistIpMutation,
  useGetAllIpsQuery,
  useGetIpQuery,
  useDeleteIpMutation,
} = whitelistApi;
