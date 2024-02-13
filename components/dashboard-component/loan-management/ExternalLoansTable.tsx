"use client";
import React from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import FilterIcon from "@/assets/svg/FilterIcon";
import TableIcon from "@/assets/svg/TableIcon";

const ExternalLoansTable = () => {
  const columns = [
    {
      title: "Name",
      sorter: true,
    },
    {
      title: "Count",
      sorter: true,
    },
    {
      title: "Disbursed",
      sorter: true,
    },
    {
      title: "Initiated On",
      sorter: true,
    },
    {
      title: "Status",
      sorter: true,
    },
    {
      title: (
        <span className="flex items-center space-x-2">
          <p>Action</p>
          <TableIcon className="ml-4" />
        </span>
      ),
      render: () => {
        return <span className="cursor-pointer">...</span>;
      },
    },
  ];
  return (
    <div className="bg-white flex flex-col gap-[1rem] py-6 px-4">
      <p className="font-semibold text-[18px]">Loan History</p>
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <div className="w-full">
          <button className="flex gap-2 items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        <Table columns={columns} dataSource={[]} />
      </div>
    </div>
  );
};

export default ExternalLoansTable;
