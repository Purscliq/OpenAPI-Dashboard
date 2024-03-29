"use client";

import React, { useEffect } from "react";
import {
  CustomInput as Input,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import { message, DatePicker } from "antd";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import FilterIcon from "@/assets/svg/FilterIcon";
import TableIcon from "@/assets/svg/TableIcon";
import {
  useReadAllTransactionsQuery,
  useDeleteTransactionMutation,
} from "@/services/business/index.service";

interface TransactionsType {
  id: string;
}

const TransactionsTable = () => {
  const {
    data: transactionData,
    isLoading,
    isError,
    error,
    refetch, 
  } = useReadAllTransactionsQuery([]);

  const [deleteTransaction, { isLoading: deleteLoading }] =
    useDeleteTransactionMutation();

  const handleDelete = async (TransactionId: string) => {
    try {
      await deleteTransaction(TransactionId);
      refetch();
      message.success("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      message.error("Failed to delete transaction");
    }
  };

  const formatCreatedOn = (createdOn: string) => {
    const date = new Date(createdOn);
    return date.toLocaleString();
  };

  const columns = [
    {
      title: "Created On",
      dataIndex: "created_at",
      sorter: true,
      render: (createdOn: string) => formatCreatedOn(createdOn),
    },
    {
      title: "Transaction Id",
      dataIndex: "transID",
      sorter: true,
    },
    {
      title: "Customer",
      dataIndex: "customer",
      sorter: true,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      sorter: true,
    },
    {
      title: "Amount requested",
      dataIndex: "amount",
      sorter: true,
    },
    {
      title: "Actions",
      render: (record: TransactionsType) => (
        <span className="flex items-center space-x-4">
          <button type="button" title="Edit" className="">
            Edit
          </button>
          <button
            type="button"
            title="Delete"
            className=""
            onClick={() => handleDelete(record.id)}
          >
            {/* Add onClick handler for delete action */}
            {deleteLoading ? "Deleting..." : <DeleteIcon />}
          </button>
        </span>
      ),
    },
  ];
  return (
    <div className="bg-white flex flex-col gap-[1rem] py-6 px-4">
      <p className="font-semibold text-[18px]">Transaction History</p>
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <DatePicker className="h-fit !w-[15rem]" placeholder="Start Date" />
        <DatePicker className="h-fit !w-[15rem]" placeholder="End Date" />
        <div className="w-fit">
          <Input className="h-fit w-fit" placeholder="Amount" />
        </div>
        <div className="flex justify-end w-full">
          <button className="flex gap-2 items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error fetching Transactions</p>
        ) : (
          <Table columns={columns} dataSource={transactionData?.data || []} />
        )}
      </div>
    </div>
  );
};

export default TransactionsTable;
