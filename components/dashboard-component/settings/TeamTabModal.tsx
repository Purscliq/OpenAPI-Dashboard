"use client";

import React, { useState } from "react";
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomModal,
} from "@/lib/AntdComponents";

const TeamTabModal: React.FC = () => {
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
        Invite Member
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
              Add Team Member
            </h1>
            <p className="text-[#515B6F] text-base text-center">
              Enter the following details to add new team member
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-[#25324B] text-base font-semibold"
              >
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="john@doe.mail"
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="role"
                className="text-[#25324B] text-base font-semibold"
              >
                Select a role for member
              </label>
              <Select
                id=""
                defaultValue=""
                options={[
                  { value: "", label: "Select a role" },
                  { value: "Role1", label: "Role1" },
                  { value: "Role2", label: "Role2" },
                ]}
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white rounded-[0.25rem] w-full md:w-max px-6 py-3 text-base"
              >
                Send Invite
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default TeamTabModal;
