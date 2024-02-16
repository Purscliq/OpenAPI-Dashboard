"use client";

import React from "react";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import type { TabsProps } from "antd";
import APIKeysTab from "./Tabs/APIKeysTab";
import WebhooksTab from "./Tabs/WebhooksTab";
import WhitelistTab from "./Tabs/WhitelistTab";

const Developers = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="flex gap-2 px-2">API Keys</span>,
      children: <APIKeysTab />,
    },
    {
      key: "2",
      label: <span className="flex gap-2 px-2">Webhooks</span>,
      children: <WebhooksTab />,
    },
    {
      key: "3",
      label: <span className="flex gap-2 px-2">Whitelist</span>,
      children: <WhitelistTab />,
    },
  ];

  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <span>
        <h2 className="text-[24px] font-bold mb-1"> Developers </h2>
      </span>

      <section className="space-y-4">
        <div className="">
          <Tabs defaultActiveKey="1" items={items} tabBarGutter={15} />
        </div>
      </section>
    </section>
  );
};

export default Developers;
