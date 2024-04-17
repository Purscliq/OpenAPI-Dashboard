"use client";
import { useEffect, useLayoutEffect } from "react";
import { updateUser } from "@/slice/userSlice";
import { useAppDispatch } from "@/context/store";
import { useLazyProfileQuery } from "@/services/users/index.service";
import logo from "@/assets/svg/logo.svg";

import {
  useLazyGetMainAccountQuery,
  useLazyGetSubaccountQuery,
  useLazyGetTotalCollectionQuery,
  useLazyGetTotalDisbursementQuery,
  useLazyGetTotalTransactionsQuery,
  useLazyGetTotalTransferQuery,
} from "@/services/business/index.service";
import Image from "next/image";

const Template = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  let token: unknown = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const [getUser, { isLoading }] = useLazyProfileQuery();
  const [getMaindata, { isLoading: isgetmaindata }] =
    useLazyGetMainAccountQuery();
  const [getToatalcollection, { isLoading: isgetColletion }] =
    useLazyGetTotalCollectionQuery();
  const [getDisembursment, { isLoading: isgetDisemburs }] =
    useLazyGetTotalDisbursementQuery();
  const [getTransfer, { isLoading: isgetTransfer }] =
    useLazyGetTotalTransferQuery();
  const [getTransaction, { isLoading: isgetTransaction }] =
    useLazyGetTotalTransactionsQuery();
  const [getSubaccount, { isLoading: isgetSubaacount }] =
    useLazyGetSubaccountQuery();

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const [
            userData,
            mainData,
            collectionData,
            disbursementData,
            transferData,
            transactionData,
            subaccountData,
          ] = await Promise.all([
            getUser({}).unwrap(),
            getMaindata({}).unwrap(),
            getToatalcollection({}).unwrap(),
            getDisembursment({}).unwrap(),
            getTransfer({}).unwrap(),
            getTransaction({}).unwrap(),
            getSubaccount({}).unwrap(),
          ]);

          dispatch(updateUser(userData?.data?.data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [token]);

  useLayoutEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  }, [token]);

  if (
    isLoading ||
    isgetmaindata ||
    isgetColletion ||
    isgetDisemburs ||
    isgetTransfer ||
    isgetTransaction ||
    isgetSubaacount
  ) {
    return (
      <div className="relative h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="fixed top-0 left-0 px-6 py-4">
          <Image src={logo} alt="logo" className="w-28 h-28" />
        </div>
        <div className="fixed inset-0 bg-black opacity-50 z-50" />
        <div className="w-16 h-16 border-t-4 border-black border-solid rounded-full animate-spin z-50" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Template;
