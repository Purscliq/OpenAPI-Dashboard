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

const DirectorVerificationTab = () => {
  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
        <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm">
          <p className="font-semibold text-base">Verify your phone number</p>
          <p className="font-normal text-base">
            Input a correct phone number and an OTP will be sent to you
          </p>
        </div>

        <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
          <form className="space-y-4">
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

export default DirectorVerificationTab;
