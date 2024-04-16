"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import { message } from "antd";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import {
  useReadAllWebhooksQuery,
  useDeleteWebhookMutation,
} from "@/services/apikeys/index.service";
import { LoadingOutlined } from "@ant-design/icons";

interface WebhookType {
  id: string;
}

const WebhookTable = () => {
  const {
    data: webhooksData,
    isLoading,
    isError,
    error,
    refetch, // Function to manually refetch the webhooks data
  } = useReadAllWebhooksQuery([]);

  // deleting a webhook
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
    return date.toLocaleString();
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
    // {
    //   title: "Expiry Date",
    //   dataIndex: "date",
    //   sorter: true,
    // },
    {
      title: "Actions",
      render: (record: WebhookType) => (
        <span className="flex items-center space-x-4">
          {/* <button type="button" title="Edit" className="">
            Edit
          </button> */}
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
