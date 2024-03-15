import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";
import { useProfileQuery } from "@/services/users/index.service";

const template = ({ children }: { children: React.ReactNode }) => {
  useProfileQuery({});
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default template;
