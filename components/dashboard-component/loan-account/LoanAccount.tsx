"use client";
import React from "react";
import LoanAccountTable from "./LoanAccountTable";
import AllLoansIcon from "@/assets/svg/AllLoansIcon";
import RunningLoansIcon from "@/assets/svg/RunningLoansIcon";
import PaidLoansIcon from "@/assets/svg/PaidLoansIcon";
import PastDueLoansIcon from "@/assets/svg/PastDueLoansIcon";
import { useGetAllLoansQuery } from "@/services/business/index.service";

const LoanAccount = () => {
  const { data } = useGetAllLoansQuery({});

  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6 h-screen overflow-y-scroll">
      <h2 className="text-[24px] font-bold block">Loan Account</h2>

      <div className="flex flex-wrap md:gap-8 gap-4">
        {/* All Loans Card */}
        <div className="rounded-[14px] border border-[#DDDDDD] bg-white p-4 space-y-3">
          <AllLoansIcon />
          <p className="text-base text-[#001733] font-semibold">All Loans</p>
          <div className="flex justify-between gap-4">
            <p className="text-[24px] text-[#25282C] font-bold">
              NGN {data?.data?.all_loans?.total_amount}
            </p>
            <p className="text-[12px] text-[#00AE4E] bg-[#E5FFF1] font-normal px-6 py-2 rounded-full">
              + {data?.data?.all_loans?.percentage_diff}%
            </p>
          </div>
        </div>

        {/* Running Loans Card */}
        <div className="rounded-[14px] border border-[#DDDDDD] bg-white p-4 space-y-3">
          <RunningLoansIcon />
          <p className="text-base text-[#001733] font-semibold">
            Running Loans
          </p>
          <div className="flex justify-between gap-4">
            <p className="text-[24px] text-[#25282C] font-bold">
              NGN {data?.data?.running_loans?.total_amount}
            </p>
            <p className="text-[12px] text-[#F83C3F] bg-[#FFEEEE] font-normal px-6 py-2 rounded-full">
              + {data?.data?.running_loans?.percentage_diff}%
            </p>
          </div>
        </div>

        {/* Paid Loans Card */}
        <div className="rounded-[14px] border border-[#DDDDDD] bg-white p-4 space-y-3">
          <PaidLoansIcon />
          <p className="text-base text-[#001733] font-semibold">Paid Loans</p>
          <div className="flex justify-between gap-4">
            <p className="text-[24px] text-[#25282C] font-bold">
              NGN {data?.data?.paid_loans?.total_amount}
            </p>
            <p className="text-[12px] text-[#00AE4E] bg-[#E5FFF1] font-normal px-6 py-2 rounded-full">
              + {data?.data?.paid_loans?.percentage_diff}%
            </p>
          </div>
        </div>

        {/* Past Due Loans Card */}
        <div className="rounded-[14px] border border-[#DDDDDD] bg-white p-4 space-y-3">
          <PastDueLoansIcon />
          <p className="text-base text-[#001733] font-semibold">
            Past Due Loans
          </p>
          <div className="flex justify-between gap-4">
            <p className="text-[24px] text-[#25282C] font-bold">
              NGN {data?.data?.past_due_loans?.total_amount}
            </p>
            <p className="text-[12px] text-[#F83C3F] bg-[#FFEEEE] font-normal px-6 py-2 rounded-full">
              + {data?.data?.past_due_loans?.percentage_diff}%
            </p>
          </div>
        </div>
      </div>

      <div>
        <LoanAccountTable data={data?.data?.all_loans?.loans} />
      </div>
    </section>
  );
};

export default LoanAccount;
