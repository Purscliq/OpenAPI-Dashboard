import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import {
  CustomInput as Input,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import FilterIcon from "@/assets/svg/FilterIcon";
import TableIcon from "@/assets/svg/TableIcon";
import { useGetSubaccountQuery } from "@/services/users/index.service";

const AccountTable = () => {
  const { data: subaccounts, isLoading } = useGetSubaccountQuery({});

  const columns = [
    {
      title: "Account name",
      dataIndex: "account_name",
      sorter: true,
    },
    {
      title: "Sub-account Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Current Balance",
      dataIndex: "current_balance",
      sorter: true,
      render: (current_balance:any) => `NGN ${current_balance}`, // Prepend "NGN" format
    },
    {
      title: "Date",
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
      title: (
        <span className="flex items-center uppercase space-x-2">
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
    <div className="bg-white flex flex-col gap-[1rem] ">
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <DatePicker className="h-fit !w-[15rem]" placeholder="Start Date" />
        <DatePicker className="h-fit !w-[15rem]" placeholder="End Date" />
        <div className="w-fit">
          <Input className="h-fit w-fit" placeholder="Amount" />
        </div>
        <div className="flex justify-end w-full cursor-pointer">
          <span className="flex items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </span>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-[22rem] md:w-full">
        <Table columns={columns} dataSource={subaccounts} loading={isLoading} />
      </div>
    </div>
  );
};

export default AccountTable;
