"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

const template = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default template;
