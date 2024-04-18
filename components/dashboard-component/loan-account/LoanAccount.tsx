"use client"
import React from "react";
import LoanAccountTable from "./LoanAccountTable";
import AllLoansIcon from "@/assets/svg/AllLoansIcon";
import RunningLoansIcon from "@/assets/svg/RunningLoansIcon";
import PaidLoansIcon from "@/assets/svg/PaidLoansIcon";
import PastDueLoansIcon from "@/assets/svg/PastDueLoansIcon";
import { useGetAllLoansQuery } from "@/services/business/index.service";

const data = [
  {
    icon: <AllLoansIcon />,
    title: "All Loans",
    amount: "NGN632.000",
    percentage: "+1.29%",
    color: "bg-[#E5FFF1]",
    textColor: "text-[##00AE4E]",
  },
  {
    icon: <RunningLoansIcon />,
    title: "Running Loans",
    amount: "NGN592.000",
    percentage: "+1.29%",
    color: "bg-[#FFEEEE]",
    textColor: "text-[#F83C3F]",
  },
  {
    icon: <PaidLoansIcon />,
    title: "Paid Loans",
    amount: "NGN354.000",
    percentage: "+1.29%",
    color: "bg-[#E5FFF1]",
    textColor: "text-[##00AE4E]",
  },
  {
    icon: <PastDueLoansIcon />,
    title: "Past Due Loans",
    amount: "NGN238.000",
    percentage: "+1.29%",
    color: "bg-[#FFEEEE]",
    textColor: "text-[#F83C3F]",
  },
];

const LoanAccount = () => {
  const { data: loan } = useGetAllLoansQuery({});
  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <h2 className="text-[24px] font-bold block">Loan Account</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-[14px] border border-[#DDDDDD] bg-white p-4 space-y-3"
          >
            {item.icon}
            <p className="text-base text-[#001733] font-semibold">
              {item.title}
            </p>
            <div className="flex justify-between gap-4">
              <p className="text-[24px] text-[#25282C] font-bold">
                {item.amount}
              </p>
              <p
                className={`text-[12px] ${item.textColor} ${item.color} font-normal px-6 py-2 rounded-full`}
              >
                {item.percentage}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <LoanAccountTable />
      </div>
    </section>
  );
};

export default LoanAccount;
