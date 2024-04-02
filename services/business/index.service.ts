import { baseQueryWithReauth } from "@/constant";
import { createApi } from "@reduxjs/toolkit/query/react";

export const businessApi = createApi({
  reducerPath: "business",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["account"],
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

    inviteUser: builder.mutation({
      query: (body) => ({
        url: "/api/v1/business/invite-user",
        method: "POST",
        body,
      }),
    }),
    getTeamMembers: builder.query({
      query: () => ({
        url: "/api/v1/business/team-members",
        method: "GET",
      }),
    }),
    getbusiness: builder.query({
      query: () => ({
        url: "/api/v1/business",
        method: "GET",
      }),
    }),
    updatebusiness: builder.mutation({
      query: (body) => ({
        url: "/api/v1/business/update",
        method: "PUT",
        body
      }),
    }),
    createSubaccount: builder.mutation({
      query: (body) => ({
        url: "api/v1/business/subaccounts",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["account"],
    }),
    getSubaccount: builder.query({
      query: () => ({
        url: "api/v1/business/subaccounts",
        method: "GET",
      }),
      providesTags: ["account"],
    }),
    updateDirector: builder.mutation({
      query: (body) => ({
        url: "api/v1/business/director/update",
        method: "PATCH",
        body: body,
      }),
    }),
    getDirector: builder.query({
      query: () => ({
        url: "api/v1/business/director",
        method: "GET",
      }),
    }),
    verifyBvn: builder.mutation({
      query: (body) => ({
        url: "api/v1/business/check-bvn",
        method: "POST",
        body,
      }),
    }),
    createUploadFile: builder.mutation({
      query: (body) => ({
        url: "/api/v1/business/image-upload",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreateTransactionMutation,
  useReadAllTransactionsQuery,
  useReadTransactionQuery,
  useDeleteTransactionMutation,
  useInviteUserMutation,
  useGetbusinessQuery,
  useUpdatebusinessMutation,
  useGetSubaccountQuery,
  useCreateSubaccountMutation,
  useUpdateDirectorMutation,
  useGetDirectorQuery,
  useVerifyBvnMutation,
  useGetTeamMembersQuery,
  useCreateUploadFileMutation
} = businessApi;
