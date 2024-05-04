import React, { useEffect, useState } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import {
  useGetApiKeysQuery,
  useDeleteApiKeyMutation,
} from "@/services/apikeys/index.service";
import { Button, Tooltip, message } from "antd";

const APIKeyTable = ({ shouldRefresh }: { shouldRefresh: boolean }) => {
  const { data: apiKeysData, isLoading, refetch } = useGetApiKeysQuery([]);

  useEffect(() => {
    if (shouldRefresh) {
      refetch();
    }
  }, [shouldRefresh, refetch]);

  const [deleteApiKey] = useDeleteApiKeyMutation();

  const [tooltipVisibility, setTooltipVisibility] = useState<{ [key: string]: boolean }>({});

  const handleDelete = async (apiKeyId: string) => {
    try {
      await deleteApiKey(apiKeyId);
      refetch();
    } catch (error) {
      console.error("Error deleting API key:", error);
    }
  };

  const toggleTooltip = (apiKeyId: string, visible: boolean) => {
    setTooltipVisibility(prevState => ({
      ...prevState,
      [apiKeyId]: visible
    }));
  };

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
          <div className="flex justify-end items-end mb-3">
            <Tooltip
              title="Copied!"
              trigger="click"
              visible={tooltipVisibility[record.id] || false}
              onVisibleChange={(visible) => toggleTooltip(record.id, visible)}
            >
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(record?.secret_key);
                  toggleTooltip(record.id, true);
                  setTimeout(() => {
                    toggleTooltip(record.id, false);
                  }, 2000);
                }}
                className="text-lg font-semibold !border-none"
              >
                Copy API Key
              </Button>
            </Tooltip>
          </div>

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
