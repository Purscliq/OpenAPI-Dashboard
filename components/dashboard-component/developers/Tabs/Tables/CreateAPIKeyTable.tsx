"use client";

import React from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import { useGetApiKeysQuery } from "@/services/auth/index.service";
import DeleteIcon from "@/assets/svg/DeleteIcon";

const CreateAPIKeyTable = () => {
  const {
    data: apiKeysData,
    isLoading,
    isError,
    error,
  } = useGetApiKeysQuery([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Source IP",
      dataIndex: "sourceIP",
      sorter: true,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      sorter: true,
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
        {isLoading ? "Loading..." : `${apiKeysData?.length} API Key(s)`}
      </p>

      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error fetching API keys</p>
        ) : (
          <Table columns={columns} dataSource={apiKeysData?.data || []} />
        )}
      </div>
    </div>
  );
};

export default CreateAPIKeyTable;
