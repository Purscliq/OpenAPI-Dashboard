import React, { useState } from "react";
import {
  CustomInput as Input,
  CustomPasswordInput as PasswordInput,
} from "@/lib/AntdComponents";
import { useProfileQuery } from "@/services/users/index.service";
import {
  useChangePasswordMutation,
  useDisable2faMutation,
} from "@/services/auth/index.service";
import { message } from "antd";
import { passwordSchema } from "@/lib/PasswordSchema";

const MyProfileTab = () => {
  const [formData, setFormData] = useState({
    password: "",
    old_password: "",
  });
  const [validationError, setValidationError] = useState("");

  const { data: user } = useProfileQuery({});
  const [disabled, { isLoading }] = useDisable2faMutation();
  const [changePassword, { isLoading: ischanging }] =
    useChangePasswordMutation();
  const handleDisable2FA = () => {
    disabled({})
      .unwrap()
      .then((res) => {
        message.success(
          "Two-factor authentication has been successfully disabled."
        );
      })
      .catch((err) => {
        message.error(err?.data?.message || "Something went wrong");
      });
  };
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password")
      passwordSchema
        .validate({ password: e.target?.value })
        .then(() => setValidationError(""))
        .catch((error) => setValidationError(error.message));
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };
  const handleUpdatePass = () => {
    if (!validationError) {
      changePassword({ ...formData })
        .unwrap()
        .then((res) => {
          console.log(res);
          message.success("Password updated successfully");
        })
        .catch((err) => {
          message.error(err?.data?.message || "Something went wrong");
        });
    }
  };
  return (
    <section className="bg- py-4 px-0 space-y-4">
      <div className="border-b pb-2">
        <p className="font-semibold text-base">Your Profile</p>
        <p className="font-normal text-base text-[#7C8493]">
          This is personal information that you can update anytime.
        </p>
      </div>

      <form className="">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8 pb-4 border-b">
          <div className="md:col-span-3">
            <p className="font-semibold text-base">Personal Details</p>
          </div>
          <div className="md:col-span-5 space-y-4  md:mr-16 lg:mr-24">
            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="FirstName"
                className="block text-sm font-semibold text-gray-700"
              >
                First Name
              </label>

              <Input
                type="text"
                id="FirstName"
                name="first name"
                value={user?.data?.first_name}
                disabled
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="LastName"
                className="block text-sm font-semibold text-gray-700"
              >
                Last Name
              </label>

              <Input
                type="text"
                id="LastName"
                name="last name"
                value={user?.data?.last_name}
                disabled
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <Input
                type="email"
                id="email"
                name="email"
                value={user?.data?.email}
                disabled
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700"
              >
                Phone
              </label>

              <Input
                type="tel"
                id="phone"
                name="phone"
                disabled
                value={user?.data?.phone_number}
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-8 gap-8 py-4 border-b">
          <div className="md:col-span-3">
            <span className="flex flex-col gap-2">
              <p className="font-semibold text-base">New Password</p>
              <p className="font-normal text-base text-[#7C8493]">
                Manage your password to make sure it is safe
              </p>
            </span>
          </div>
          <form className="md:col-span-5 space-y-4 md:mr-16 lg:mr-24">
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Old Password
              </label>
              <PasswordInput
                id="oldPassword"
                name="old_password"
                placeholder="Enter old password"
                value={formData.old_password}
                onChange={handlechange}
                required
                className="p-2 border w-full rounded-md bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                New Password
              </label>
              <PasswordInput
                id="newPassword"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handlechange}
                required
                className="p-2 border w-full rounded-md bg-white text-sm text-gray-700 shadow-sm"
              />
              {formData.password && validationError && (
                <p className="text-red-500">{validationError}</p>
              )}
            </div>
            <div className="">
              <div className="mt-8">
                <button
                  disabled={ischanging}
                  onClick={handleUpdatePass}
                  className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  {ischanging ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </form>

      {/* disable 2FA */}
      {user?.data?.two_fa_enabled && (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
          <div className="md:col-span-3">
            <span className="flex flex-col gap-2">
              <p className="font-semibold text-base">
                Disable your 2FA Authentication
              </p>
              <p className="font-normal text-base text-[#7C8493]">
                Scan the QR code using any authenticator on your phone{" "}
                <span className="font-semibold text-[#515B6F]">
                  (e.g Google Authenticator, Duo Mobile, Authy).
                </span>
              </p>
            </span>
          </div>
          <div className="md:col-span-5 space-y-4  md:mr-16 lg:mr-24">
            <div className="">
              <div className="mt-8 flex gap-6">
                <button
                  type="reset"
                  className="w-full text-center text-md rounded-md px-4 py-2 font-medium text-black border border-[#E9EBEB] focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDisable2FA}
                  className="w-full bg-[#F6513B] text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  Disable
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyProfileTab;
