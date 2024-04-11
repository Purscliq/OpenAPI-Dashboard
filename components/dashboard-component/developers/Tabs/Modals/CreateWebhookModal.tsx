"use client";

import React, { useState } from "react";
import { CustomInput, CustomModal as Modal } from "@/lib/AntdComponents";
import { message } from "antd";
import { useCreateWebhookMutation } from "@/services/apikeys/index.service";

const CreateWebhookModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [authHeader, setAuthHeader] = useState("");
  const [createWebhook, { isLoading }] = useCreateWebhookMutation();

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
      const response = await createWebhook({ name, url, authHeader });

      if ("data" in response) {
        if (response.data.status === "success") {
          message.success("Webhook created successfully");
          handleOk();
        } else {
          message.error(response.data.error.message || "An error occurred");
        }
      } else {
        message.error("An error occurred. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error creating webhook:", error);
      message.error(error?.message || "An error occurred");
    }
  };

  return (
    <>
      <div className="flex md:justify-end">
        <button
          type="button"
          className="py-3 px-9 text-white text-sm bg-black rounded-[0.25rem]"
          onClick={showModal}
        >
          Create Webhook
        </button>
      </div>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="py-6">
          <div className="border-b pb-1">
            <h1 className="font-bold text-[#242F57] text-[32px] text-center">
              Create Webhook
            </h1>
            <p className="text-[#515B6F] text-base text-center">
              Enter the following details to create a new Webhook
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="text-[#25324B] text-base font-semibold"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="url"
                className="text-[#25324B] text-base font-semibold"
              >
                URL
              </label>
              <input
                id="url"
                name="url"
                type="text"
                placeholder="https://web.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="authHeader"
                className="text-[#25324B] text-base font-semibold"
              >
                Authorization Header (Optional)
              </label>
              <input
                id="authHeader"
                type="text"
                placeholder="Authorization token"
                value={authHeader}
                onChange={(e) => setAuthHeader(e.target.value)}
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
      </Modal>
    </>
  );
};

export default CreateWebhookModal;
