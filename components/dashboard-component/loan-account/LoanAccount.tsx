"use client";

import React from "react";
import LoanAccountTable from "./LoanAccountTable";
import AllLoansIcon from "@/assets/svg/AllLoansIcon";
import RunningLoansIcon from "@/assets/svg/RunningLoansIcon";
import PaidLoansIcon from "@/assets/svg/PaidLoansIcon";
import PastDueLoansIcon from "@/assets/svg/PastDueLoansIcon";
import { useGetAllLoansQuery } from "@/services/business/index.service";

interface Loan {
  actual_amount: number;
  status: string;
}

const LoanAccount = () => {
  const { data: loanData } = useGetAllLoansQuery({});

  const allLoansTotal: string = (
    loanData?.data.reduce(
      (acc: number, loan: Loan) => acc + loan.actual_amount,
      0
    ) || 0
  ).toLocaleString();
  const runningLoansTotal: string = (
    loanData?.data.reduce(
      (acc: number, loan: Loan) =>
        loan.status === "running" ? acc + loan.actual_amount : acc,
      0
    ) || 0
  ).toLocaleString();
  const paidLoansTotal: string = (
    loanData?.data.reduce(
      (acc: number, loan: Loan) =>
        loan.status === "paid" ? acc + loan.actual_amount : acc,
      0
    ) || 0
  ).toLocaleString();
  const pastDueLoansTotal: string = (
    loanData?.data.reduce(
      (acc: number, loan: Loan) =>
        loan.status === "past-due" ? acc + loan.actual_amount : acc,
      0
    ) || 0
  ).toLocaleString();

  const data = [
    {
      icon: <AllLoansIcon />,
      title: "All Loans",
      amount: <>NGN{allLoansTotal}</>,
      percentage: "+0%",
      color: "bg-[#E5FFF1]",
      textColor: "text-[##00AE4E]",
    },
    {
      icon: <RunningLoansIcon />,
      title: "Running Loans",
      amount: <>NGN{runningLoansTotal}</>,
      percentage: "+0%",
      color: "bg-[#FFEEEE]",
      textColor: "text-[#F83C3F]",
    },
    {
      icon: <PaidLoansIcon />,
      title: "Paid Loans",
      amount: <>NGN{paidLoansTotal}</>,
      percentage: "+0%",
      color: "bg-[#E5FFF1]",
      textColor: "text-[##00AE4E]",
    },
    {
      icon: <PastDueLoansIcon />,
      title: "Past Due Loans",
      amount: <>NGN{pastDueLoansTotal}</>,
      percentage: "+0%",
      color: "bg-[#FFEEEE]",
      textColor: "text-[#F83C3F]",
    },
  ];

  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6 h-screen overflow-y-scroll">
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

// import React from "react";
// import LoanAccountTable from "./LoanAccountTable";
// import AllLoansIcon from "@/assets/svg/AllLoansIcon";
// import RunningLoansIcon from "@/assets/svg/RunningLoansIcon";
// import PaidLoansIcon from "@/assets/svg/PaidLoansIcon";
// import PastDueLoansIcon from "@/assets/svg/PastDueLoansIcon";
// import { useGetAllLoansQuery } from "@/services/business/index.service";

// const LoanAccount = () => {
//   // const { data: loan } = useGetAllLoansQuery({});
//   const { data: loanData } = useGetAllLoansQuery({});

//   const data = [
//     {
//       icon: <AllLoansIcon />,
//       title: "All Loans",

//       amount: <>NGN{loanData?.data?.actual_amount || 0}</>,
//       percentage: "+0%",
//       color: "bg-[#E5FFF1]",
//       textColor: "text-[##00AE4E]",
//     },
//     {
//       icon: <RunningLoansIcon />,
//       title: "Running Loans",
//       amount: <>NGN{loanData?.data?.actual_amount || 0}</>,
//       percentage: "+0%",
//       color: "bg-[#FFEEEE]",
//       textColor: "text-[#F83C3F]",
//     },
//     {
//       icon: <PaidLoansIcon />,
//       title: "Paid Loans",
//       amount: <>NGN{loanData?.data?.actual_amount || 0}</>,
//       percentage: "+0%",
//       color: "bg-[#E5FFF1]",
//       textColor: "text-[##00AE4E]",
//     },
//     {
//       icon: <PastDueLoansIcon />,
//       title: "Past Due Loans",
//       amount: <>NGN{loanData?.data?.actual_amount || 0}</>,
//       percentage: "+0%",
//       color: "bg-[#FFEEEE]",
//       textColor: "text-[#F83C3F]",
//     },
//   ];

//   return (
//     <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
//       <h2 className="text-[24px] font-bold block">Loan Account</h2>

//       <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-8 gap-4">
//         {data.map((item, index) => (
//           <div
//             key={index}
//             className="rounded-[14px] border border-[#DDDDDD] bg-white p-4 space-y-3"
//           >
//             {item.icon}
//             <p className="text-base text-[#001733] font-semibold">
//               {item.title}
//             </p>
//             <div className="flex justify-between gap-4">
//               <p className="text-[24px] text-[#25282C] font-bold">
//                 {item.amount}
//               </p>
//               <p
//                 className={`text-[12px] ${item.textColor} ${item.color} font-normal px-6 py-2 rounded-full`}
//               >
//                 {item.percentage}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="">
//         <LoanAccountTable />
//       </div>
//     </section>
//   );
// };

// export default LoanAccount;
