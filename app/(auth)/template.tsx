"use client"
import React, { useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import logo from "@/assets/svg/logo.svg";
import { useLazyProfileQuery } from "@/services/users/index.service";
import { useLazyGetDashboardQuery } from "@/services/business/index.service";

const SESSION_TIMEOUT = 10 * 60 * 1000; 

const Template: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    } else {
      const handleUserActivity = () => {
        clearTimeout(sessionTimeoutTimer);
        resetSessionTimeout();
      };
      document.addEventListener("mousemove", handleUserActivity);
      document.addEventListener("mousedown", handleUserActivity);
      document.addEventListener("keypress", handleUserActivity);
      document.addEventListener("touchstart", handleUserActivity);

      return () => {
        document.removeEventListener("mousemove", handleUserActivity);
        document.removeEventListener("mousedown", handleUserActivity);
        document.removeEventListener("keypress", handleUserActivity);
        document.removeEventListener("touchstart", handleUserActivity);
      };
    }
  }, []);

  // Session timeout logic
  let sessionTimeoutTimer: string | number | NodeJS.Timeout | undefined;
  const resetSessionTimeout = () => {
    clearTimeout(sessionTimeoutTimer);
    sessionTimeoutTimer = setTimeout(() => {
      handleLogout(); 
    }, SESSION_TIMEOUT);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    window.location.href = "/"; 
  };

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
