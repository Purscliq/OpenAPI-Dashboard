"use client";

import React, { useState } from "react";
import { CustomModal } from "@/lib/AntdComponents";
import { message } from "antd";
import { useWhitelistIpMutation } from "@/services/apikeys/index.service";

const CreateWhitelistModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ipAddress, setIpAddress] = useState("");
  const [whitelistIp, { isLoading }] = useWhitelistIpMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await whitelistIp({ ipv4: ipAddress });

      if ("data" in response) {
        if (response.data.status === "success") {
          message.success("IP whitelisted successfully");
          handleOk();
        } else {
          message.error(response.data.error.message || "An error occurred");
        }
      } else {
        message.error("An error occurred. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error whitelisting IP:", error);
      message.error(error?.message || "An error occurred");
    }
  };

  return (
    <>
      <button
        type="button"
        className="py-3 px-9 text-white text-sm bg-black rounded-[0.25rem]"
        onClick={showModal}
      >
        Create Whitelist
      </button>

      <CustomModal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="py-6">
          <div className="border-b pb-1">
            <h1 className="font-bold text-[#242F57] text-[32px] text-center">
              Create new Whitelist
            </h1>
            <p className="text-[#515B6F] text-base text-center">
              Enter the following details to create a new Whitelist
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="IP"
                className="text-[#25324B] text-base font-semibold"
              >
                IP Address
              </label>
              <input
                id="ipv4"
                name="ipv4"
                type="text"
                placeholder="192.168.1.1"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white rounded-[0.25rem] w-full md:w-max px-6 py-3 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default CreateWhitelistModal;
