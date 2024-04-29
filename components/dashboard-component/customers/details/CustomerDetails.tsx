"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { message, Tabs } from "antd";
import type { TabsProps } from "antd";
import KYCTab from "./KYCTab";
import InfoTab from "./InfoTab";
import TransactionsTab from "./TransactionsTab";
import { BsArrowLeft } from "react-icons/bs";
import { useActivateCustomerMutation, useDeactivateCustomerMutation, useGetSingleCustomerQuery } from "@/services/business/index.service";
import { Switch } from 'antd';

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
  {
    key: "3",
    label: "Transactions",
    children: <TransactionsTab />,
  },
];

const CustomerDetails = () => {
  const router = useRouter();
  const id = sessionStorage.getItem("customer_id")
  const {data: customerStatus, isLoading, refetch} = useGetSingleCustomerQuery(id)
  const [activateCustomer] = useActivateCustomerMutation(); // Destructure to get the mutation function
  const [deactivateCustomer] = useDeactivateCustomerMutation(); // Destructure to get the mutation function
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customerStatus?.data.status === "active") {
      setChecked(true);
      console.log(customerStatus?.data.status)
    } else {
      setChecked(false);
      console.log(customerStatus?.data.status)
    }
  }, [customerStatus, isLoading]);

  const onChange = async (checked: boolean) => {
    console.log(`switch to ${checked}`);
    setLoading(true)
    if (checked) {
      refetch()
      
      try {
        await activateCustomer(id);
        console.log("Customer activated successfully");
        message.success("activation successful")
        // Handle successful activation (e.g., show a success message)
      } catch (error) {
        console.error("Error activating customer:", error);
        // Handle activation error (e.g., show an error message)
      }
    } else {
      try {
        await deactivateCustomer(id);
        console.log("Customer deactivated successfully");
        message.success("deactivation successful")
        // Handle successful deactivation (e.g., show a success message)
      } catch (error) {
        console.error("Error deactivating customer:", error);
        // Handle deactivation error (e.g., show an error message)
      }
    }
    setLoading(false)
  };

 
  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll text-[#25324B]">
      <div className="flex flex-wrap md:flex-nowrap gap-4 justify-between">
        <div className="flex gap-4">
          <button type="button" title="Back" onClick={() => router.back()}>
            <BsArrowLeft className="w-7 h-7 my-auto" />
          </button>
          <span className="md:text-[32px] text-[18px] sm:text-[24px] flex font-semibold gap-2">
            <h2 className="">Customer- </h2>
            <span className="text-[#7C8493]">APP 0001</span>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <p className={customerStatus?.data?.status === "active" ? "text-red-400 text-[14px]" : "text-[#0AA07B] text-[14px]"}>
            {customerStatus?.data?.status === "active" ? "Deactive account" : "Activate account"}
            </p>
          <span className="flex md:justify-end">
           
              <Switch checked={checked} loading={loading}  onChange={onChange} className="peer sr-only"/>
             
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
