"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CustomInput as Input,
  CustomTable as Table,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import { DatePicker, Dropdown } from "antd";
import type { MenuProps } from "antd";

import FilterIcon from "@/assets/svg/FilterIcon";
import { useGetSingleCustomerTransactionQuery } from "@/services/business/index.service";
import { formatDate, formatMoney } from "@/helpers/dateFormat";

interface TransactionsType {
  id: string;
}

const TransactionsTable = () => {
  
const tid = "6630eeeb9681d30727781f70"
  const {data:transactions} = useGetSingleCustomerTransactionQuery(tid)

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Update the data when transactions change
    if (transactions) {
      const formattedTransactions = transactions?.data?.map((transaction: any) => ({
        created_on: formatDate(transaction.createdAt), // Assuming this field exists in transactions
        transID: transaction.txRef, // Assuming this field exists in transactions
        name: transaction.customerName, // Adjust this according to your actual data structure
        currency: transaction.currency, // Assuming this field exists in transactions
        amount: formatMoney(transaction.amount), // Assuming this field exists in transactions
      }));

      setData(formattedTransactions);
    }
  }, [transactions]);

  
  const items: MenuProps["items"] = [
    {
      label: <Link href="">View Details</Link>,
      key: "0",
    },
  ];



  const columns = [
    {
      title: "Created On",
      dataIndex: "created_on",
      sorter: true,
    },
    {
      title: "Transaction ID",
      dataIndex: "transID",
      sorter: true,
    },
    {
      title: "Customer",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      sorter: true,
    },
    {
      title: "Amount request",
      dataIndex: "amount",
      sorter: true,
    },
    {
      title: "Actions",
      render: () => (
        <span className="flex items-center">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button
              type="button"
              title="Details"
              className="font-bold text-2xl"
            >
              ...
            </button>
          </Dropdown>
        </span>
      ),
    },
  ];
  return (
    <div className="bg-white flex flex-col gap-[1rem] py-6 px-4">
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <DatePicker className="h-fit !w-[15rem]" placeholder="Start Date" />
        <DatePicker className="h-fit !w-[15rem]" placeholder="End Date" />
        <Select
          placeholder="Amount"
          //   defaultValue=""
          className="!w-[15rem]"
          options={[
            { value: "amount", label: "Amount" },
            { value: "customer", label: "Customer" },
          ]}
        />
        <div className="flex justify-end w-full">
          <button className="flex gap-2 items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default TransactionsTable;
