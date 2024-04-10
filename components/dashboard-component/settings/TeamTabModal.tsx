"use client";

import React, { useState } from "react";
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomModal,
} from "@/lib/AntdComponents";
import { message } from "antd";
import { useInviteUserMutation } from "@/services/business/index.service";

const TeamTabModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

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

  // const roleToId = {
  const roleToId: { [key: string]: number } = {
    biller: 1, // 1 for biller
    owner: 2, //  2 for owner
    developer: 3, //  3 for developer
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const roleId = role;
    // Convert role name to role ID
    const roleId = roleToId[role];
    if (roleId === undefined) {
      message.error("Invalid role selected.");
      return;
    }

    try {
      // Include the additional required fields
      const response = await inviteUser({
        email,
        role_id: roleId,
      });

      if ("data" in response) {
        if (response.data.status === "success") {
          message.success("Invitation sent successfully");
          handleOk();
        } else {
          message.error(
            response.data.error?.message || "Failed to send invitation"
          );
        }
      } else {
        message.error("An error occurred. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending invitation:", error);
      message.error("Failed to send invitation");
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await inviteUser({ email, role });

  //     if ("data" in response) {
  //       if (response.data.status === "success") {
  //         message.success("Invitation sent successfully");
  //         handleOk();
  //       } else {
  //         message.error(
  //           response.data.error.message || "Failed to send invitation"
  //         );
  //       }
  //     } else {
  //       message.error("An error occurred. Please try again later.");
  //     }
  //   } catch (error) {
  //     console.error("Error sending invitation:", error);
  //     message.error("Failed to send invitation");
  //   }
  // };

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
                placeholder="john@doe.mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
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
                  { value: "owner", label: "Owner" },
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
