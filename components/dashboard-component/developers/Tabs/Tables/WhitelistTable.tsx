"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { message } from "antd";
import {
  useGetAllIpsQuery,
  useDeleteIpMutation,
} from "@/services/apikeys/index.service";

const WhitelistTable = () => {
  const {
    data: whitelistData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllIpsQuery([]);

  const [deleteIp, { isLoading: deleteLoading }] = useDeleteIpMutation();

  useEffect(() => {
    if (whitelistData?.data) {
      console.log("Number of whitelisted IPs:", whitelistData.data.length);
    }
  }, [whitelistData]);

  const handleDelete = async (ipAddressId: string) => {
    try {
      await deleteIp(ipAddressId);
      refetch();
      message.success("IP address deleted from whitelist successfully");
    } catch (error) {
      console.error("Error deleting IP address from whitelist:", error);
      message.error("Failed to delete IP address from whitelist");
    }
  };

  const columns = [
    {
      title: "IP Address",
      dataIndex: "ipv4",
      sorter: true,
    },
    {
      title: "Access Type",
      dataIndex: "access_type",
      sorter: true,
    },
    {
      title: "Actions",
      render: (record: any) => (
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
            {deleteLoading ? "Deleting..." : <DeleteIcon />}
          </button>
        </span>
      ),
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

      <div className="relative overflow-x-auto sm:rounded-lg w-full">
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
