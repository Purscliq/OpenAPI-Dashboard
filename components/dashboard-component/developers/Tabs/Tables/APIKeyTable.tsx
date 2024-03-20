"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { message } from "antd";
import {
  useGetApiKeysQuery,
  useDeleteApiKeyMutation,
} from "@/services/apikeys/index.service";

const APIKeyTable = () => {
  const {
    data: apiKeysData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetApiKeysQuery([]);

  const [deleteApiKey, { isLoading: deleteLoading }] =
    useDeleteApiKeyMutation();

  useEffect(() => {
    if (apiKeysData?.data) {
      console.log("Number of API Keys:", apiKeysData.data.length);
    }
  }, [apiKeysData]);

  // Function to format the date
  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust this method according to your preferred date format
  };

  const handleDelete = async (apiKeyId: string) => {
    try {
      await deleteApiKey(apiKeyId);
      refetch();
      message.success("API Key deleted successfully");
    } catch (error) {
      console.error("Error deleting API key:", error);
      message.error("Failed to delete API key");
    }
  };

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
      title: "Date Created",
      dataIndex: "created_at",
      sorter: true,
      render: (createdAt: string) => formatCreatedAt(createdAt),
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
          : apiKeysData?.data
          ? `${apiKeysData.data.length} API Key(s)`
          : "No API Keys"}
      </p>

      <div className="relative overflow-x-auto sm:rounded-lg w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error fetching API keys</p>
        ) : (
          <Table columns={columns} dataSource={apiKeysData?.data || []} />
        )}
      </div>
    </div>
  );
};

export default APIKeyTable;
