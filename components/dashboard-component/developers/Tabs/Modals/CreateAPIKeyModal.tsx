"use client";

import React, { useState, useEffect } from "react";
import { CustomModal as Modal } from "@/lib/AntdComponents";
import { message } from "antd";
import { useCreateApiKeyMutation } from "@/services/apikeys/index.service";
import { useGetServicesQuery } from "@/services/business/index.service";

const CreateAPIKeyModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [sourceIP, setSourceIP] = useState("");
  const [createApiKey, { isLoading }] = useCreateApiKeyMutation();

  // const { data: services = [], error } = useGetServicesQuery();
  const {
    data: services = [],
    error,
    isLoading: servicesLoading,
  } = useGetServicesQuery({});

  // Log the content of services array
  useEffect(() => {
    console.log("Services:", services);
  }, [services]);

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
      // Get the selected service
      const selectedService = services.data.find(
        (s: { name: string }) => s.name === service
      );

      const response = await createApiKey({
        name,
        service_id: selectedService.id, // Include service_id in the request body
        permission_payload: [
          {
            service: "loan service",
            models_permission: [
              {
                model: "transactions",
                permissions: ["read", "create"],
              },
            ],
          },
        ],
      });

      if ("data" in response) {
        // Check if the API key creation was successful
        if (response.data.status === "success") {
          message.success("API key created successfully");
          setIsModalOpen(false);
        } else {
          message.error(response.data.error.message || "An error occurred");
        }
      } else {
        message.error("An error occurred. Please try again later.");
      }
    } catch (error: any) {
      console.error("Error creating API key:", error);
      message.error(error?.message || "An error occurred");
    }
  };

  // if (servicesLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  return (
    <>
      <button
        type="button"
        className="py-3 px-9 text-white text-sm bg-black rounded-[0.25rem]"
        onClick={showModal}
      >
        Create API Key
      </button>

      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="py-6">
          <div className="border-b pb-1">
            <h1 className="font-bold text-[#242F57] text-[32px] text-center">
              Create new API Key
            </h1>
            <p className="text-[#515B6F] text-base text-center">
              Enter the following details to create a new API key
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
                htmlFor="service"
                className="text-[#25324B] text-base font-semibold"
              >
                Service
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              >
                <option value="">Select a service</option>
                {services.data &&
                  services.data.map &&
                  services.data.map((service: { id: number; name: string }) => (
                    <option key={service.id} value={service.name}>
                      {service.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="sourceIP"
                className="text-[#25324B] text-base font-semibold"
              >
                Source IP Address(es) (Optional)
              </label>
              <input
                id="sourceIP"
                type="text"
                placeholder="192-168.1.1"
                value={sourceIP}
                onChange={(e) => setSourceIP(e.target.value)}
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

export default CreateAPIKeyModal;
