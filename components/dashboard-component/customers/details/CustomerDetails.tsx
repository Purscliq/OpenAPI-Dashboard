"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import KYCTab from "./KYCTab";
import InfoTab from "./InfoTab";
import { BsArrowLeft } from "react-icons/bs";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Basic Info",
    children: <InfoTab />,
  },
  {
    key: "2",
    label: "KYC",
    children: <KYCTab />,
  },
];

const CustomerDetails = () => {
  const router = useRouter();

  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll text-[#25324B]">
      <div>
        <div className="flex gap-4">
          <button type="button" title="Back" onClick={() => router.back()}>
            <BsArrowLeft className="w-7 h-7 my-auto" />
          </button>
          <span className="md:text-[32px] text-[18px] sm:text-[24px] flex font-semibold gap-2">
            <h2 className="">Customer- </h2>
            <span className="text-[#7C8493]">APP 0001</span>
          </span>
        </div>
      </div>

      <div className="bg-white pb-6">
        <Tabs type="card" defaultActiveKey="1" items={items} />
      </div>
    </section>
  );
};

export default CustomerDetails;
