"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  CustomInput as Input,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import { DatePicker, Avatar, Typography, Dropdown } from "antd";
import type { MenuProps } from "antd";

import FilterIcon from "@/assets/svg/FilterIcon";

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
  const items: MenuProps["items"] = [
    {
      label: <Link href="/customers/details">View Details</Link>,
      key: "0",
    },
  ];

  const data = [
    {
      name: "Cruise Tech",
      created_at: "Feb 9th, 2024",
      customer_type: "Individual",
      status: "Active",
    },
    {
      name: "Cruise Tech",
      created_at: "Feb 9th, 2024",
      customer_type: "Individual",
      status: "Active",
    },
    {
      name: "Cruise Tech",
      created_at: "Feb 9th, 2024",
      customer_type: "Individual",
      status: "Inactive",
    },
    {
      name: "Cruise Tech",
      created_at: "Feb 9th, 2024",
      customer_type: "Individual",
      status: "Active",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      render: (text: string, record: any) => (
        <span className="flex gap-3 items-center">
          <InitialAvatar name={text} />
          {record.name}
        </span>
      ),
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
      render: (text: string) => (
        <span className={`text-${text === "Active" ? "green" : "red"}-500`}>
          {text}
        </span>
      ),
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

export default CustomersTable;
