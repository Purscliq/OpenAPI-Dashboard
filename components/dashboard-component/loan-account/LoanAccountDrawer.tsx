"use client";

import React, { useState } from "react";
import { Button, Drawer } from "antd";
import { useGetAllLoansQuery } from "@/services/business/index.service";

interface LoanData {
  customer_name: string;
  created_at: string;
  count: number;
  actual_amount: number;
  interest: number;
  due_date: string;
  fees: number;
  status: string;
  penalty: number;
  total_amount: number;
}

const LoanAccountDrawer = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: LoanData;
}) => {
  const formatDate = (created_at: string) => {
    const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  const formattedDate = formatDate(data?.created_at);

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
                {data?.customer_name}
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
                {data?.count}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Disbursed</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{data?.actual_amount}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Interest</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{data?.interest}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Due date</p>
              <p className="text-[14px] font-bold text-[#181336]">
                {data?.due_date}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Fees</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{data?.fees}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Status</p>
              <p
                className={`text-[14px] font-bold ${
                  data?.status === "past-due"
                    ? "text-[#F6513B]"
                    : data?.status === "paid"
                    ? "text-green-400"
                    : data?.status === "running"
                    ? "text-orange-400"
                    : "text-black" // color for unknown status
                }`}
              >
                {data?.status || "Unknown Status"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Penalty</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{data?.penalty || "0.00"}
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Total fees</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN{data?.total_amount}
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
