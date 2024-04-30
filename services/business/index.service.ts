import { baseQueryWithReauth } from "@/constant";
import { createApi } from "@reduxjs/toolkit/query/react";

export const businessApi = createApi({
  reducerPath: "business",
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  tagTypes: ["account", "Customer"],
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
        body,
      }),
    }),
    createSubaccount: builder.mutation({
      query: (body) => ({
        url: "/api/v1/business/account/subaccounts",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["account"],
    }),
    getSubaccount: builder.query({
      query: () => ({
        url: "/api/v1/business/account/subaccounts",
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
    verifyTin: builder.mutation({
      query: (body) => ({
        url: "api/v1/business/validate-tin",
        method: "POST",
        body,
      }),
    }),
    createUploadFile: builder.mutation({
      query: (formData) => ({
          url: "/api/v1/business/image-upload",
          method: "POST",
          body: formData,
      }),
    }),
    getServices: builder.query({
      query: () => ({
        url: "/api/v1/business/services",
        method: "GET",
      }),
    }),
    getAllLoans: builder.query({
      query: () => ({
        url: "/api/v1/business/loans",
        method: "GET",
      }),
    }),
    getDashboard: builder.query({
      query: () => ({
        url: "/api/v1/business/dashboard",
        method: "GET",
      }),
    }),
    getComplainceStat: builder.query({
      query: () => ({
        url: "/api/v1/business/compliance_status",
        method: "GET",
      }),
    }),
    getAllCustomers: builder.query({
      query: () => ({
        url: "/api/v1/business/customers",
        method: "GET",
      }),
    }),
    getBankList: builder.query({
      query: () => ({
        url: "/api/v1/business/transactions/utils/bank-list",
        method: "GET",
      }),
    }),
    getSingleCustomer: builder.query({
      query: (id) => ({
        url: `/api/v1/business/customers/${id}`,
        method: "GET",
      }),
      providesTags: ["Customer"]
    }),
    activateCustomer: builder.mutation({
      query: (id) => ({
        url: `/api/v1/business/customers/${id}/activate`,
        method: "POST",
      }),
      invalidatesTags: ["Customer"]
    }),
    deactivateCustomer: builder.mutation({
      query: (id) => ({
        url: `/api/v1/business/customers/${id}/deactivate`,
        method: "POST",
      }),
      invalidatesTags: ["Customer"]
    }),
    createCustomer: builder.mutation({
      query: (body) => ({
        url: "/api/v1/business/customers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer"]
    }),
    initiateWithdrawal: builder.mutation({
      query: (body) => ({
        url: "/api/v1/business/customers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer"]
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
  useLazyGetSubaccountQuery,
  useCreateSubaccountMutation,
  useUpdateDirectorMutation,
  useGetDirectorQuery,
  useVerifyBvnMutation,
  useGetTeamMembersQuery,
  useCreateUploadFileMutation,
  useGetServicesQuery,
  useGetDashboardQuery,
  useLazyGetDashboardQuery,
  useVerifyTinMutation,
  useGetAllLoansQuery,
  useGetComplainceStatQuery,
  useGetAllCustomersQuery,
  useCreateCustomerMutation,
  useGetSingleCustomerQuery,
  useActivateCustomerMutation,
  useDeactivateCustomerMutation,
  useGetBankListQuery
} = businessApi;
