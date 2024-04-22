"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import { message } from "antd";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import {
  useReadAllWebhooksQuery,
  useDeleteWebhookMutation,
} from "@/services/apikeys/index.service";

interface WebhookType {
  id: string;
}

const WebhookTable = ({ shouldRefresh }: { shouldRefresh: boolean }) => {
  const {
    data: webhooksData,
    isLoading,
    isError,
    error,
    refetch,
  } = useReadAllWebhooksQuery([]);

  useEffect(() => {
    if (shouldRefresh) {
      refetch();
    }
  }, [shouldRefresh, refetch]);

  const [deleteWebhook] =
    useDeleteWebhookMutation();

  const handleDelete = async (webhookId: string) => {
    try {
      await deleteWebhook(webhookId);
      refetch();
      // message.success("Webhook deleted successfully");
    } catch (error) {
      console.error("Error deleting webhook:", error);
      message.error("Failed to delete webhook");
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
      dataIndex: "url",
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
      render: (record: WebhookType) => (
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

  // if (isLoading) {
  //   return (
  //     <div className="bg-white flex flex-col justify-center items-center h-[30vh]">
  //       <LoadingOutlined style={{ fontSize: 24 }} spin />
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white flex flex-col gap-[1rem] px-4">
      <p className="font-semibold text-[18px]">
        {webhooksData?.data
          ? `${webhooksData.data.length} Webhook(s)`
          : "No Webhooks"}
      </p>

      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        <Table
          columns={columns}
          dataSource={webhooksData?.data || []}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default WebhookTable;
