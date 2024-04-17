"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CustomTable as Table } from "@/lib/AntdComponents";
import type { MenuProps } from "antd";
import { Button, Dropdown, Space } from "antd";

import FilterIcon from "@/assets/svg/FilterIcon";
import TableIcon from "@/assets/svg/TableIcon";
import LoanAccountDrawer from "./LoanAccountDrawer";

const LoanAccountTable = () => {
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
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Count",
      dataIndex: "count",
      sorter: true,
    },
    {
      title: "Disbursed",
      dataIndex: "disbursed",
      sorter: true,
    },
    {
      title: "Initiated On",
      dataIndex: "initiated",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
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
        <Table columns={columns} dataSource={data} />
      </div>
      <LoanAccountDrawer onClose={onClose} open={open} />
    </div>
  );
};

export default LoanAccountTable;
