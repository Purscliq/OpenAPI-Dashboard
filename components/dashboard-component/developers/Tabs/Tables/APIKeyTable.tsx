import React, { useEffect, useState } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents"; // Import Popover and Button from Ant Design
import DeleteIcon from "@/assets/svg/DeleteIcon";
import {
  useGetApiKeysQuery,
  useDeleteApiKeyMutation,
} from "@/services/apikeys/index.service";
import { Button, Popover } from "antd";

const APIKeyTable = ({ shouldRefresh }: { shouldRefresh: boolean }) => {
  const { data: apiKeysData, isLoading, refetch } = useGetApiKeysQuery([]);
  const [selectedApiKey, setSelectedApiKey] = useState<any>(null); // State to store selected API key

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
    }
  };

  const handleView = (apiKey: any) => {
    setSelectedApiKey(apiKey);
  };

  const content = selectedApiKey.key ? (
    <div>
      <p>API Key: {selectedApiKey.key}</p>
    </div>
  ) : (
    <div>
      <p>No API Key </p>
    </div>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Service",
      dataIndex: "service_name",
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
          <Popover content={content} title="API Key Details" trigger="click">
            <Button type="text" onClick={() => handleView(record)}>
              View
            </Button>
          </Popover>
          <Button
            type="text"
            title="Delete"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteIcon />
          </Button>
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
