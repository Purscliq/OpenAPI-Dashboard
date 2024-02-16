"use client";

import React from "react";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import type { TabsProps } from "antd";
import MyProfileTab from "./Tabs/MyProfileTab";
import BusinessProfileTab from "./Tabs/BusinessProfileTab";
import TeamTab from "./Tabs/TeamTab";

const Settings = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="flex gap-2 px-2">My Profile</span>,
      children: <MyProfileTab />,
    },
    {
      key: "2",
      label: <span className="flex gap-2 px-2">Business Profile</span>,
      children: <BusinessProfileTab />,
    },
    {
      key: "3",
      label: <span className="flex gap-2 px-2">Team</span>,
      children: <TeamTab />,
    },
  ];

  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <span>
        <h2 className="text-[24px] font-bold mb-1"> Settings </h2>
      </span>

      <section className="space-y-4">
        <div className="">
          <Tabs defaultActiveKey="1" items={items} tabBarGutter={15} />
        </div>
      </section>
    </section>
  );
};

export default Settings;
