"use client";

import React, { ChangeEventHandler, useState } from "react";
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomModal,
} from "@/lib/AntdComponents";
import { message } from "antd";
import { useInviteUserMutation } from "@/services/business/index.service";

const TeamTabModal: React.FC<{ onTeamMemberAdded: () => void }> = ({
  onTeamMemberAdded,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role_id: "",
  });
  const [inviteUser, { isLoading }] = useInviteUserMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };
  // const roleToId = {
  const roleToId: { [key: string]: number } = {
    biller: 1, // 1 for biller
    developer: 2, //  3 for developer
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const roleId = roleToId[role];
    if (roleId === undefined) {
      message.error("Invalid role selected.");
      return;
    }

    inviteUser({ ...formData, role_id: roleId })
      .unwrap()
      .then(() => {
        onTeamMemberAdded();
        handleOk();
      })
      .catch((error) => {
        message.error(error.data.message || "Failed to send invitation");
      });
  };

  return (
    <>
      <div className="flex md:justify-end">
        <button
          type="button"
          className="py-3 px-9 text-white text-sm bg-black rounded-[0.25rem]"
          onClick={showModal}
        >
          Invite Member
        </button>
      </div>

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
              Enter the following details to add a new team member
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                name="email"
                placeholder="john@doe.mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>
            <div className="col-span-6 sm:col-span-3 flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="FirstName"
                className="block text-sm font-semibold text-gray-700"
              >
                First Name
              </label>

              <Input
                id="firstName"
                required
                value={formData.first_name}
                onChange={handleChange}
                name="first_name"
                type="text"
                placeholder="Enter your first name"
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm h-[46px]"
              />
            </div>

            <div className="col-span-6 sm:col-span-3 flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="LastName"
                className="block text-sm font-semibold text-gray-700"
              >
                Last Name
              </label>

              <Input
                id="LastName"
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleChange}
                type="text"
                placeholder="Enter your last name"
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm h-[46px]"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="role"
                className="text-[#25324B] text-base font-semibold"
              >
                Select a role for the member
              </label>
              <Select
                id="role"
                defaultValue=""
                value={role}
                onChange={(value) => setRole(value)}
                options={[
                  { value: "", label: "Select a role" },
                  { value: "biller", label: "Biller" },
                  { value: "developer", label: "Developer" },
                ]}
                className="p-2 border w-full rounded-md bg-white text-sm text-gray-700 shadow-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-black text-white rounded-[0.25rem] w-full md:w-max px-6 py-3 text-base"
                disabled={isLoading}
              >
                {isLoading ? "Sending Invitation..." : "Send Invite"}
              </button>
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  );
};

export default TeamTabModal;
