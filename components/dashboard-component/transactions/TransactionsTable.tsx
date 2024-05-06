"use client";

import React, { useEffect, useState } from "react";
import {
  CustomInput as Input,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import { message, DatePicker, Dropdown, Menu } from "antd";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import FilterIcon from "@/assets/svg/FilterIcon";
import TableIcon from "@/assets/svg/TableIcon";
import {
  useReadAllTransactionsQuery,
  useDeleteTransactionMutation,
} from "@/services/business/index.service";
import TransactionDrawer from "./transactionsDrawer";

interface TransactionsType {
  id: string;
}

const TransactionsTable = () => {
  const {
    data: transactionData,
    isLoading,
    refetch,
  } = useReadAllTransactionsQuery([]);
  const [open, setOpen] = useState(false);
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
  const showDrawer = (record: any) => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  const formatCreatedOn = (createdOn: string) => {
    const date = new Date(createdOn);
    return date.toLocaleString();
  };

  const data = [
   { created_at: "2|12|2024",
    transID: "tx-1234",
    sender: "emmanuel",
    receipient: 'johnny',
    amount: 500

  }
  ]

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
      title: "Sender",
      dataIndex: "sender",
      sorter: true,
    },
    {
      title: "Rceipient",
      dataIndex: "receipient",
      sorter: true,
    },
    {
      title: "Amount requested",
      dataIndex: "amount",
      sorter: true,
    },
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <>
        <Dropdown 
        overlay={
          <Menu>
              <Menu.Item key="1">
                <button
                onClick={() => showDrawer(record)}
                >
                  View details
                </button>
              </Menu.Item>
            </Menu>
        }
        >
          <button type="button" className="text-base font-semibold">
            ...
          </button>
        </Dropdown>
      </>
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
        <Table
          columns={columns}
          dataSource={/**transactionData?.data || []*/ data}
          loading={isLoading}
        />
      </div>
      <TransactionDrawer onClose={onClose} open={open} />
    </div>
  );
};

export default TransactionsTable;
