import React from "react";
import {
  CustomInput as Input,
  CustomSelect as Select,
  CustomPasswordInput as PasswordInput,
} from "@/lib/AntdComponents";

const MyProfileTab = () => {
  return (
    <section className="bg- py-4 px-0 space-y-4">
      <div className="border-b pb-2">
        <p className="font-semibold text-base">Your Profile</p>
        <p className="font-normal text-base text-[#7C8493]">
          This is personal information that you can update anytime.
        </p>
      </div>

      <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
        <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm flex flex-col justify-around">
          <p className="font-semibold text-base">Personal Details</p>
          <div className="col-span-3 space-y-2 w-full md:max-w-sm hidden md:block">
            <p className="font-semibold text-base">New Password</p>
            <p className="font-normal text-base text-[#7C8493]">
              Manage your password to make sure it is safe
            </p>
          </div>
        </div>

        <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
          <form className="space-y-4">
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
                placeholder="This is placeholder"
                required
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
                placeholder="This is placeholder"
                required
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
                placeholder="This is placeholder"
                required
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
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="md:hidden block py-6">
              <p className="font-semibold text-base">New Password</p>
              <p className="font-normal text-base text-[#7C8493]">
                Manage your password to make sure it is safe
              </p>
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Old Password
              </label>

              <PasswordInput
                id="oldPassword"
                name="old password"
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
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
                name="new password"
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="">
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MyProfileTab;
