"use client";
import React from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import TeamTabModal from "./TeamTabModal";

const TeamTabTable = () => {
  const columns = [
    {
      title: "Name",
      sorter: true,
    },
    {
      title: "Role",
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
      <div className="sm:flex justify-between gap-6 space-y-4 sm:space-y-0">
        <p className="font-semibold text-[18px]">3 Team members</p>
        <TeamTabModal />
      </div>

      <div className="relative overflow-x-auto  sm:rounded-lg w-full">
        <Table columns={columns} dataSource={[]} />
      </div>
    </div>
  );
};

export default TeamTabTable;
