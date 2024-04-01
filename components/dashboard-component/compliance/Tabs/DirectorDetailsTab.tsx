import React, { useState } from "react";
import {
  CustomInput as Input,
  CustomDatePicker as DatePicker,
} from "@/lib/AntdComponents";
import { Select } from "antd";
import type { UploadProps, UploadFile } from "antd";
import { message, Upload } from "antd";
import { useCreateUploadFileMutation } from "@/services/business/index.service";

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

const DirectorDetailsTab = () => {
  const [createUploadFile, { isLoading }] = useCreateUploadFileMutation();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUpload = async ({ file }: { file: UploadFile }) => {
    try {
      if (!file.originFileObj) {
        throw new Error("No file object found.");
      }

      const formData = new FormData();
      formData.append("file", file.originFileObj);

      const response = await createUploadFile(formData);

      if ("data" in response) {
        message.success(`${file.name} uploaded successfully.`);
      } else {
        message.error(`Failed to upload ${file.name}.`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error(`Failed to upload ${file.name}.`);
    }
  };

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/v1/business/image-upload",
    onChange(info) {
      setFileList(info.fileList);
      handleUpload(info);
    },
    onRemove(file) {
      setFileList((prevFileList) =>
        prevFileList.filter((item) => item.uid !== file.uid)
      );
    },
  };

  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
        <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm">
          <p className="font-semibold text-base">Tell us about yourself</p>
          <p className="font-normal text-base">
            This must be the name on your registration Documentation.
          </p>
        </div>

        <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
          <form className="space-y-4">
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="BVN"
                className="block text-sm font-semibold text-gray-700"
              >
                BVN
              </label>

              <Input
                type="number"
                id="BVN"
                name="BVN"
                placeholder="1234567890"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="md:flex gap-4 justify-between space-y-4 md:space-y-0">
              <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Legal First Name
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
                  Legal Last Name
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
                htmlFor="gender"
                className="block text-sm font-semibold text-gray-700"
              >
                Gender
              </label>

              <Select
                id="gender"
                defaultValue=""
                options={[
                  { value: "", label: "Select an option" },
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                ]}
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
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
                htmlFor="FirstName"
                className="block text-sm font-semibold text-gray-700"
              >
                Nationality
              </label>

              <Select
                id="RegCountry"
                defaultValue=""
                options={[
                  { value: "", label: "Select an option" },
                  { value: "Nigerian", label: "Nigerian" },
                  { value: "Ghanian", label: "Ghanian" },
                ]}
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="Address"
                className="block text-sm font-semibold text-gray-700"
              >
                Residential Address
              </label>

              <Input
                type="text"
                id="Address"
                name="residential address"
                placeholder="John"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="FirstName"
                className="block text-sm font-semibold text-gray-700"
              >
                Country
              </label>

              <Select
                id="RegCountry"
                defaultValue=""
                options={[
                  { value: "", label: "Select an option" },
                  { value: "Nigeria", label: "Nigeria" },
                  { value: "Ghana", label: "Ghana" },
                ]}
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
              />
            </div>

            {/* upload */}
            <Dragger
              {...props}
              className="flex flex-col items-center  gap-[0.3rem]"
            >
              <span className="ant-upload-drag-icon mx-auto">
                <ImageIcon />
              </span>
              <p className="ant-upload-text">
                <b className="font-semibold">Click to replace</b> or drag and
                drop
              </p>
              <p className="ant-upload-hint">
                SVG, PNG, JPG or GIF (max. 400 x 400px)
              </p>
            </Dragger>

            <div className="flex flex-col gap-[0.3rem]">
              <label
                htmlFor="IDCard"
                className="block text-sm font-semibold text-gray-700"
              >
                ID Card (Govt Issued)
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
                htmlFor="signature"
                className="block text-sm font-semibold text-gray-700"
              >
                Signature
              </label>
              <Dragger
                {...props}
                id="signature"
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
                htmlFor="ProofOfAddress"
                className="block text-sm font-semibold text-gray-700"
              >
                Proof of address
              </label>
              <Dragger
                {...props}
                id="ProofOfAddress"
                className="flex items-center text-center gap-[0.3rem]"
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
  );
};

export default DirectorDetailsTab;
