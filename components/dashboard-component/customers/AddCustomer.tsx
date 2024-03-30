"use client";

import React from "react";
import {
  CustomInput as Input,
  CustomDatePicker as DatePicker,
} from "@/lib/AntdComponents";
import { Select } from "antd";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

import ImageIcon from "@/assets/svg/ImageIcon";
import AttachIcon from "@/assets/svg/AttachIcon";

const { Option } = Select;
const { Dragger } = Upload;

const selectBefore = (
  <Select defaultValue="+234">
    <Option value="+234">+234</Option>
    <Option value="+233">+233</Option>
  </Select>
);

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddCustomer = () => {
  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <span className="">
        <h2 className="text-[24px] font-bold mb-1"> Customers </h2>
      </span>

      <section className="bg-white py-4 px-4 space-y-4">
        <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
          <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Add New Customer</p>
            <p className="font-normal text-base max-w-[260px]">
              Fill the necessary form to apply for a new loan
            </p>
          </div>

          <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
            <form className="space-y-4">
              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="customerType"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Choose A Customer Type
                </label>

                <Select
                  id="customerType"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "Type1", label: "Type1" },
                    { value: "Type2", label: "Type2" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

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
                  name="first_name"
                  placeholder="John"
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
                  name="first_name"
                  placeholder="Doe"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </label>

                <Input
                  addonBefore={selectBefore}
                  defaultValue=""
                  type="tel"
                  id="phone"
                  name="phone number"
                  placeholder="801234567890"
                  required
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="John.doe@mail"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="DOB"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Date of Birth
                </label>
                <DatePicker className="w-full" />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Postal code
                </label>

                <Input
                  type="number"
                  id="postalCode"
                  name="Postal code"
                  placeholder="This is placeholder"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="Country"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Country
                </label>

                <Select
                  id="Country"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "Nigeria", label: "Nigeria" },
                    { value: "Ghana", label: "Ghana" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="state"
                  className="block text-sm font-semibold text-gray-700"
                >
                  State
                </label>

                <Select
                  id="state"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "Lagos", label: "Lagos" },
                    { value: "Abuja", label: "Abuja" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-gray-700"
                >
                  City
                </label>

                <Input
                  type="text"
                  id="city"
                  name="city"
                  placeholder="This is placeholder"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="Address"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Address
                </label>

                <Input
                  type="text"
                  id="Address"
                  name="address"
                  placeholder="This is placeholder"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="KYC"
                  className="block text-sm font-semibold text-gray-700"
                >
                  KYC Identity Type (Optional)
                </label>

                <Input
                  type="text"
                  id="KYC"
                  name="KYC"
                  placeholder="This is placeholder"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="bankVerification"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Bank Verification (Optional)
                </label>

                <Input
                  type="text"
                  id="bankVerification"
                  name="bank verification"
                  placeholder="This is placeholder"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-[0.3rem]">
                <label
                  htmlFor="IDCard"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Upload ID Card (Optional)
                </label>

                <Dragger
                  {...props}
                  id="IDCard"
                  className="flex items-center text-center  gap-[0.3rem]"
                >
                  <p className="ant-upload-text flex gap-4">
                    <AttachIcon />
                    Attach Document
                  </p>
                </Dragger>
              </div>

              <div className="flex flex-col gap-[0.3rem]">
                <label
                  htmlFor="utilityBill"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Utility Bill (Optional)
                </label>
                <Dragger
                  {...props}
                  id="utilityBill"
                  className="flex items-center text-center  gap-[0.3rem]"
                >
                  <p className="ant-upload-text flex gap-4">
                    <AttachIcon />
                    Attach Document
                  </p>
                </Dragger>
              </div>

              <div className="">
                <div className="flex justify-between gap-4 mt-8">
                  <button
                    type="submit"
                    className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="w-full text-center text-md rounded-md px-4 py-2 font-medium text-black focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AddCustomer;
