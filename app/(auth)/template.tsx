"use client"
import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import logo from "@/assets/svg/logo.svg";
import { useAppDispatch } from "@/context/store";
import { useLazyProfileQuery } from "@/services/users/index.service";
import { useLazyGetDashboardQuery } from "@/services/business/index.service";
// import { updateUser } from "@/slice/userSlice";

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const dispatch = useAppDispatch();
  const [getUser, { isLoading: isProfileLoading }] = useLazyProfileQuery();
  const [getDashboard, { isLoading: isDashboardLoading, isSuccess }] =
    useLazyGetDashboardQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([getUser({}).unwrap(), getDashboard({}).unwrap()]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    }
  }, []);

  if (isProfileLoading || isDashboardLoading || !isSuccess) {
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
