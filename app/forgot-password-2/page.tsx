"use client";
import ForgotPass2 from "@/components/auth/forgot-pass-2/ForgotPass2";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();
  return <ForgotPass2 email={params.get("email") || ""} />;
};

export default Page;
