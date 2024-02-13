import React from "react";
import ExternalLoansTable from "./ExternalLoansTable";
import Link from "next/link";
import ExternalLoanDrawer from "./Drawer/ExternalLoanDrawer";

const data = [
  {
    title: "All Entries",
    amount: "632",
    percentage: "+1.29%",
    color: "bg-[#E5FFF1]",
    textColor: "text-[##00AE4E]",
  },
  {
    title: "Email Invites",
    amount: "592",
    percentage: "+1.29%",
    color: "bg-[#FFEEEE]",
    textColor: "text-[#F83C3F]",
  },
  {
    title: "SMS Invites",
    amount: "354",
    percentage: "+1.29%",
    color: "bg-[#E5FFF1]",
    textColor: "text-[##00AE4E]",
  },
  {
    title: "Loan SDKs",
    amount: "238",
    percentage: "+1.29%",
    color: "bg-[#FFEEEE]",
    textColor: "text-[#F83C3F]",
  },
];

const ExternalLoans = () => {
  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <div className="md:flex justify-between gap-4 space-y-4 md:space-y-0">
        <h2 className="text-[24px] font-bold block">
          Loan Management &gt;{" "}
          <Link href="#" className="hover:underline">
            External Loans
          </Link>
        </h2>
        <button className="bg-black px-6 py-3 rounded-md text-white text-base font-semibold block w-max">
          Create Invite
        </button>
      </div>
      <div className="grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="rounded-[14px] border border-[#DDDDDD] bg-white p-4 space-y-3"
          >
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
        <ExternalLoanDrawer />
        <ExternalLoansTable />
      </div>
    </section>
  );
};

export default ExternalLoans;
