"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CustomInput as Input,
  CustomTable as Table,
} from "@/lib/AntdComponents";
import { DatePicker, Avatar, Typography, Dropdown } from "antd";
import type { MenuProps } from "antd";

import FilterIcon from "@/assets/svg/FilterIcon";
import { useGetAllCustomersQuery } from "@/services/business/index.service";
import { formatDate } from "@/helpers/dateFormat";




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
  const [data, setData] = useState([]);


  const { data: customers, isLoading, isError } = useGetAllCustomersQuery({})

 
  useEffect(() => {
    if (customers && !isLoading && !isError && customers.data) {
    const mappedData = customers.data.map((customer: any) => ({
    name: customer.firstName + ' ' + customer.lastName,
    created_at: formatDate(customer.createdAt),
    customer_type: customer.userType,
    status: customer.status,
    action: customer._id,
    }));
    setData(mappedData);
    }
    }, [customers, isLoading, isError]); 
 

 
  const items: MenuProps["items"] = [
    {
      label: <Link href="/customers/details">View Details</Link>,
      key: "0",
    },
  ];

  const set_id = (id: string) =>{
    sessionStorage.setItem("customer_id",id )
  }

 

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
        <span className={`text-${text === "active" ? "green" : "red"}-500`}>
          {text}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text: string) => (
        <span className="flex items-center">
          <Dropdown menu={{ items }} trigger={["click"]}>
            <button
              type="button"
              title="Details"
              className="font-bold text-2xl"
              onClick={() => set_id(text)}
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
        <Table columns={columns} dataSource={data} loading={isLoading} />
      </div>
    </div>
  );
};

export default CustomersTable;
