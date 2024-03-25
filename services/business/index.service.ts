import { baseQueryWithReauth } from "@/constant";
import { createApi } from "@reduxjs/toolkit/query/react";

export const businessApi = createApi({
  reducerPath: "business",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query: (body) => ({
        url: "/api/v1/business/transactions",
        method: "POST",
        body,
      }),
    }),
    readAllTransactions: builder.query({
      query: () => ({
        url: "/api/v1/business/transactions",
        method: "GET",
      }),
    }),
    readTransaction: builder.query({
      query: (transaction_ref) => ({
        url: `/api/v1/business/transactions/${transaction_ref}`,
        method: "GET",
      }),
    }),
    deleteTransaction: builder.mutation({
      query: (transaction_ref) => ({
        url: `/api/v1/business/transactions/${transaction_ref}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useReadAllTransactionsQuery,
  useReadTransactionQuery,
  useDeleteTransactionMutation,
} = businessApi;
