"use client";

import React, { useState } from "react";
import { CustomInput, CustomModal } from "@/lib/AntdComponents";

const CreateAPIKeyModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="py-3 px-9 text-white text-sm bg-black rounded-[0.25rem]"
        onClick={showModal}
      >
        Create API Key
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
              Create new API Key
            </h1>
            <p className="text-[#515B6F] text-base text-center">
              Enter the following details to create a new API key
            </p>
          </div>
          <form className="mt-8 space-y-6">
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
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="validity"
                className="text-[#25324B] text-base font-semibold"
              >
                Validity
              </label>
              <select
                id="validity"
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              >
                <option value="">Select a validity period</option>
                <option value="Time1">Time1</option>
                <option value="Time2">Time2</option>
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
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white rounded-[0.25rem] w-full md:w-max px-6 py-3 text-base"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default CreateAPIKeyModal;
