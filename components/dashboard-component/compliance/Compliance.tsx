"use client";

import React from "react";
import { CustomTabs as Tabs } from "@/lib/AntdComponents";
import type { TabsProps } from "antd";
import DirectorDetailsTab from "./Tabs/DirectorDetailsTab";
import DirectorVerificationTab from "./Tabs/DirectorVerificationTab";
import BusinessDetailsTab from "./Tabs/BusinessDetailsTab";
import BusinessDocumentUploadTab from "./Tabs/BusinessDocumentUploadTab";

const Compliance = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <span className="flex gap-2 px-2">Director Details</span>,
      children: <DirectorDetailsTab />,
    },
    {
      key: "2",
      label: <span className="flex gap-2 px-2">Director Verification</span>,
      children: <DirectorVerificationTab />,
    },
    {
      key: "3",
      label: <span className="flex gap-2 px-2">Business Details</span>,
      children: <BusinessDetailsTab />,
    },
    {
      key: "4",
      label: <span className="flex gap-2 px-2">Business Document Upload</span>,
      children: <BusinessDocumentUploadTab />,
    },
  ];

  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <span>
        <h2 className="text-[24px] font-bold mb-1"> Compliance </h2>
      </span>

      <section className="space-y-4">
        <div className="">
          <Tabs defaultActiveKey="1" items={items} tabBarGutter={15} />
        </div>
      </section>
    </section>
  );
};

export default Compliance;
