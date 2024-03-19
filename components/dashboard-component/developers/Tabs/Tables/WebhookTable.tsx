"use client";

import React from "react";
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

  const columns = [
    {
      title: "Name",
      sorter: true,
    },
    {
      title: "Source IP",
      sorter: true,
    },
    {
      title: "Expiry Date",
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
        {isLoading ? "Loading..." : `${webhooksData?.length} Webhook(s)`}
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
