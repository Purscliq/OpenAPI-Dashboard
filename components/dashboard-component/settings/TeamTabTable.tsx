"use client";

import React, { useEffect } from "react";
import { CustomTable as Table } from "@/lib/AntdComponents";
import DeleteIcon from "@/assets/svg/DeleteIcon";
import { useGetTeamMembersQuery } from "@/services/business/index.service";
import { LoadingOutlined } from "@ant-design/icons";

interface TeamMembersType {
  id: string;
  first_name: string;
  last_name: string;
  role_id: number;
  email: string;
  created_at: string;
  // other properties...
}

const TeamTabTable = ({ shouldRefresh }: { shouldRefresh: boolean }) => {
  const {
    data: TeamMembersData,
    isLoading,
    isError,
    error,
    refetch, // Function to manually refetch the team members data
  } = useGetTeamMembersQuery([]);

  useEffect(() => {
    if (shouldRefresh) {
      refetch();
    }
  }, [shouldRefresh, refetch]);

  // Function to format the date
  const formatCreatedAt = (createdAt: string) => {
    const date = new Date(createdAt);
    return date.toLocaleString(); // Adjust this method according to your preferred date format
  };

  const idToRole: { [key: number]: string } = {
    1: "Biller",
    2: "Owner",
    3: "Developer",
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "first_name",
      sorter: true,
      // sorter: (a: TeamMembersType, b: TeamMembersType) =>
      //   `${a.first_name} ${a.last_name}`.localeCompare(
      //     `${b.first_name} ${b.last_name}`
      //   ),
      render: (_: string, record: TeamMembersType) =>
        record.first_name !== null && record.last_name !== null
          ? `${record.first_name} ${record.last_name}`
          : "Unknown",
    },
    {
      title: "Role",
      dataIndex: "role_id",
      sorter: true,
      render: (role_id: number) => idToRole[role_id] || "Unknown Role",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      sorter: true,
      render: (createdAt: string) => formatCreatedAt(createdAt),
    },
    {
      title: <span className="flex items-center space-x-2">Action</span>,
      render: () => {
        return (
          <span className="cursor-pointer">{/* <DeleteIcon /> */}...</span>
        );
      },
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
      <div className="sm:flex justify-between gap-6 space-y-4 sm:space-y-0">
        <p className="font-semibold text-[18px]">
          {TeamMembersData?.data
            ? `${TeamMembersData.data.length} Team member(s)`
            : "No Team member"}
        </p>
      </div>

      <div className="relative overflow-x-auto sm:rounded-lg w-full">
        <Table
          columns={columns}
          dataSource={TeamMembersData?.data || []}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default TeamTabTable;
