"use client"
import TwoFA from "@/components/dashboard-component/getting-started/TwoFA";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const params = useSearchParams();
  return <TwoFA QRcode={params.get("qr") || ""} />;
};

export default page;
