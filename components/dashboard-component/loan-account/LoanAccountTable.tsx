"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomTable as Table } from "@/lib/AntdComponents";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";

import FilterIcon from "@/assets/svg/FilterIcon";
import TableIcon from "@/assets/svg/TableIcon";
import LoanAccountDrawer from "./LoanAccountDrawer";
import { useGetAllLoansQuery } from "@/services/business/index.service";

const LoanAccountTable = () => {
  const { data: loanData, isLoading } = useGetAllLoansQuery({});
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <button onClick={showDrawer}>Details</button>,
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      count: 1,
      disbursed: "April 4th, 2024",
      initiated: "April 3rd, 2024",
      status: "Past due loan",
    },
  ];

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      sorter: true,
    },
    // {
    //   title: "Count",
    //   dataIndex: "count",
    //   sorter: true,
    // },
    {
      title: "Amount",
      dataIndex: "total_amount",
      render: (total_amount: any) => {
        return <div>₦{total_amount}</div>;
      },
      sorter: true,
    },
    {
      title: "Disbursement Method",
      dataIndex: "disbursement_method",
      sorter: true,
    },
    {
      title: "Initiated On",
      dataIndex: "created_at",
      sorter: true,
      render: (created_at: any) => {
        const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return formattedDate;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      render: (status: string) => {
        let color = "";
        switch (status) {
          case "paid":
            color = "green";
            break;
          case "past-due":
            color = "red";
            break;
          case "running":
            color = "orange";
            break;
          default:
            color = "black";
        }
        return <div style={{ color }}>{status}</div>;
      },
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   sorter: true,
    // },
    {
      title: "Action",
      render: () => {
        return (
          <>
            <Dropdown menu={{ items }}>
              {/* placement="topRight" */}
              <button type="button" className="text-base font-semibold">
                ...
              </button>
            </Dropdown>
          </>
        );
      },
    },
  ];

  return (
    <div className="bg-white flex flex-col gap-[1rem] py-6 px-4">
      <p className="font-semibold text-[18px]">Customers</p>
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <div className="w-full">
          <button className="flex gap-2 items-center rounded-[5px] border border-[#B8C9C9] px-[1%] py-2 h-max justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        <Table
          columns={columns}
          dataSource={loanData?.data || []}
          loading={isLoading}
        />
      </div>
      <LoanAccountDrawer onClose={onClose} open={open} />
    </div>
  );
};

export default LoanAccountTable;
