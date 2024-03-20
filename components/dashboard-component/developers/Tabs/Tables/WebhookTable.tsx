"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import { message } from "antd";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import {
  useReadAllWebhooksQuery,
  useDeleteWebhookMutation,
} from "@/services/apikeys/index.service"; // Import the mutation hook for deleting a webhook

interface WebhookType {
  id: string;
  // other properties...
}

const WebhookTable = () => {
  const {
    data: webhooksData,
    isLoading,
    isError,
    error,
    refetch, // Function to manually refetch the webhooks data
  } = useReadAllWebhooksQuery([]);

  // Mutation hook for deleting a webhook
  const [deleteWebhook, { isLoading: deleteLoading }] =
    useDeleteWebhookMutation();

  // Log the number of webhooks to the console if data is available
  useEffect(() => {
    if (webhooksData?.data) {
      console.log("Number of webhooks:", webhooksData.data.length);
    }
  }, [webhooksData]);

  // Function to handle deleting a webhook
  const handleDelete = async (webhookId: string) => {
    try {
      await deleteWebhook(webhookId);
      // If successful, refetch the webhooks data to update the table
      refetch();
      message.success("Webhook deleted successfully");
    } catch (error) {
      console.error("Error deleting webhook:", error);
      message.error("Failed to delete webhook");
    }
  };

  // Function to format the date
  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust this method according to your preferred date format
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
      render: (createdAt: string) => formatCreatedAt(createdAt),
    },
    {
      title: "Expiry Date",
      dataIndex: "date",
      sorter: true,
    },
    {
      title: "Actions",
      render: (record: WebhookType) => (
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
            {/* Add onClick handler for delete action */}
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
          : webhooksData?.data
          ? `${webhooksData.data.length} Webhook(s)`
          : "No Webhooks"}
      </p>

      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error fetching Webhooks</p>
        ) : (
          <Table columns={columns} dataSource={webhooksData?.data || []} />
        )}
      </div>
    </div>
  );
};

export default WebhookTable;
