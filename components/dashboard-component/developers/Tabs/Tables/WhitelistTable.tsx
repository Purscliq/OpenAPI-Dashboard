"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { useGetAllIpsQuery } from "@/services/apikeys/index.service";

const WhitelistTable = () => {
  const {
    data: whitelistData,
    isLoading,
    isError,
    error,
  } = useGetAllIpsQuery([]);

  // Log the number of webhooks to the console if data is available
  useEffect(() => {
    if (whitelistData?.data) {
      console.log("Number of whitelisted IPs:", whitelistData.data.length);
    }
  }, [whitelistData]);

  // Function to format the date
  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust this method according to your preferred date format
  };
  const columns = [
    {
      title: "IP Address",
      dataIndex: "ipv4",
      sorter: true,
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      sorter: true,
      render: (createdAt: string) => formatCreatedAt(createdAt),
    },
    {
      title: (
        <span className="flex items-center space-x-2">
          {/* delete icon */}
          {/* or Actions */}
        </span>
      ),
      render: () => {
        return (
          <span className="cursor-pointer">
            <DeleteIcon />
          </span>
        );
      },
    },
  ];
  return (
    <div className="bg-white flex flex-col gap-[1rem] py-6 px-4">
      <p className="font-semibold text-[18px]">
        {isLoading
          ? "Loading..."
          : whitelistData?.data
          ? `${whitelistData.data.length} Whitelisted IP(s)`
          : "No Whitelisted IPs"}
      </p>

      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error fetching Whitelisted IPs</p>
        ) : (
          <Table columns={columns} dataSource={whitelistData?.data || []} />
        )}
      </div>
    </div>
  );
};

export default WhitelistTable;
