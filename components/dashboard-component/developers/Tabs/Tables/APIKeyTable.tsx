"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { message } from "antd";
import {
  useGetApiKeysQuery,
  useDeleteApiKeyMutation,
} from "@/services/apikeys/index.service";

const APIKeyTable = ({ shouldRefresh }: { shouldRefresh: boolean }) => {
  const { data: apiKeysData, isLoading, refetch } = useGetApiKeysQuery([]);

  useEffect(() => {
    if (shouldRefresh) {
      refetch();
    }
  }, [shouldRefresh, refetch]);

  const [deleteApiKey] = useDeleteApiKeyMutation();

  const handleDelete = async (apiKeyId: string) => {
    try {
      await deleteApiKey(apiKeyId);
      refetch();
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
      title: "Service",
      dataIndex: "service_id",
      sorter: true,
    },

    {
      title: "Date Created",
      dataIndex: "created_at",
      sorter: true,
      render: (created_at: any) => {
        const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        return formattedDate;
      },
    },
    {
      title: "Actions",
      render: (record: any) => (
        <span className="flex items-center space-x-4">
          <button
            type="button"
            title="Delete"
            className=""
            onClick={() => handleDelete(record.id)}
          >
            <DeleteIcon />
          </button>
        </span>
      ),
    },
  ];

  return (
    <div className="bg-white flex flex-col gap-[1rem] px-4">
      <p className="font-semibold text-[18px]">
        {apiKeysData?.data
          ? `${apiKeysData.data.length} API Key(s)`
          : "No API Keys"}
      </p>

      <div className="relative overflow-x-auto sm:rounded-lg w-full">
        <Table
          columns={columns}
          dataSource={apiKeysData?.data || []}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default APIKeyTable;
