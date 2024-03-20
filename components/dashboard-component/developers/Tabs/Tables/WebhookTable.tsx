"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { useReadAllWebhooksQuery } from "@/services/apikeys/index.service";

const WebhookTable = () => {
  const {
    data: webhooksData,
    isLoading,
    isError,
    error,
  } = useReadAllWebhooksQuery([]);

  // Log the number of webhooks to the console if data is available
  useEffect(() => {
    if (webhooksData?.data) {
      console.log("Number of webhooks:", webhooksData.data.length);
    }
  }, [webhooksData]);

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
      title: (
        <span className="flex items-center space-x-2">
          {/* delete icon  and 'active' */}
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
