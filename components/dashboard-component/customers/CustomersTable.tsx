"use client";

import React, { useEffect } from "react";
import {
  CustomInput as Input,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import { DatePicker, Avatar, Typography } from "antd";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import FilterIcon from "@/assets/svg/FilterIcon";
import TableIcon from "@/assets/svg/TableIcon";
import {
  useReadAllTransactionsQuery,
  useDeleteTransactionMutation,
} from "@/services/business/index.service";

interface CustomersType {
  id: string;
}

const { Title } = Typography;

// avatar initials
interface InitialAvatarProps {
  name: string;
}
const InitialAvatar: React.FC<InitialAvatarProps> = ({ name }) => {
  // Get initials from the name
  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("");

  return (
    <Avatar style={{ backgroundColor: "#00000033" }}>
      <Title level={5} style={{ margin: 0, color: "black", fontWeight: 400 }}>
        {initials}
      </Title>
    </Avatar>
  );
};

const CustomersTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Created",
      dataIndex: "created_at",
      sorter: true,
    },
    {
      title: "Customer Type",
      dataIndex: "customer_type",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "Actions",
      render: () => (
        <span className="flex items-center space-x-4">
          <button type="button" title="Edit" className="">
            Edit
          </button>
          <button type="button" title="Delete" className="">
            <DeleteIcon />
          </button>
        </span>
      ),
    },
  ];
  return (
    <div className="bg-white flex flex-col gap-[1rem] py-6 px-4">
      <div className="flex items-center justify-start w-full gap-[1rem]">
        <DatePicker className="h-fit !w-[15rem]" placeholder="Start Date" />
        <DatePicker className="h-fit !w-[15rem]" placeholder="End Date" />
        <div className="flex justify-end w-full">
          <button className="flex gap-2 items-center rounded-[5px] border border-[#B8C9C9] p-[1%] justify-self-end self-end">
            <FilterIcon />
            <p className="text-[#202430] text-[16px] font-[500]">filter</p>
          </button>
        </div>
      </div>
      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        <Avatar size="large">CT</Avatar>
        <InitialAvatar name="Cruise Tech" />
        <Table columns={columns} dataSource={[]} />
      </div>
    </div>
  );
};

export default CustomersTable;
