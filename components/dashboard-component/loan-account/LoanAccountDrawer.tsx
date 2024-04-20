"use client";

import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { useGetAllLoansQuery } from "@/services/business/index.service";

const LoanAccountDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { data: loanData } = useGetAllLoansQuery({});

  const formatDate = (created_at: string): string => {
    const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  const createdDate = loanData?.data?.created_at || "Feb 9, 2024 12:24AM";
  const formattedDate = formatDate(createdDate);

  return (
    <>
      <Drawer
        onClose={onClose}
        open={open}
        title={null}
        placement="right"
        width={500}
        getContainer={false}
        closable={true}
        style={{ position: "absolute", padding: 0 }}
      >
        <div className="space-y-8 py-4">
          <p className="font-semibold text-[18px]">Loan Details</p>

          <div className="p-4 border rounded-md space-y-6">
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Name</p>
              <p className="text-[14px] font-bold text-[#181336]">
                {loanData?.data?.customer_name || "Peter Edoka"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Date</p>
              <p className="text-[14px] font-bold text-[#181336]">
                {formattedDate}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Count</p>
              <p className="text-[14px] font-bold text-[#181336]">
                {loanData?.data?.count || "0"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Disbursed</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{loanData?.data?.actual_amount || "10000.00"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Interest</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{loanData?.data?.interest || "1000.00"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Due date</p>
              <p className="text-[14px] font-bold text-[#181336]">
                {loanData?.data?.due_date || "2024-04-02"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Fees</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{loanData?.data?.fees || "10000.00"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Status</p>
              <p
                className={`text-[14px] font-bold ${
                  loanData?.data?.status === "past-due"
                    ? "text-[#F6513B]"
                    : loanData?.data?.status === "paid"
                    ? "text-green-400"
                    : loanData?.data?.status === "running"
                    ? "text-orange-400"
                    : "text-black" // color for unknown status
                }`}
              >
                {loanData?.data?.status || "Unknown Status"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Penalty</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{loanData?.data?.penalty || "0.00"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Total fees</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{loanData?.data?.total_amount || "10000.00"}
              </p>
            </span>

            <hr />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default LoanAccountDrawer;
