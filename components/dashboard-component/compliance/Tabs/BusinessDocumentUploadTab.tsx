import React from "react";
import { message, Upload } from "antd";
import AttachIcon from "@/assets/svg/AttachIcon";
import type { UploadProps, UploadFile } from "antd";
import { useCreateUploadFileMutation } from "@/services/business/index.service";

const { Dragger } = Upload;

const BusinessDocumentUploadTab = () => {
  const [createUploadFile, { isLoading }] = useCreateUploadFileMutation();

  const handleUpload = async ({ file }: { file: UploadFile }) => {
    try {
      if (file.originFileObj) {
        const formData = new FormData();
        formData.append("file", file.originFileObj);

        const response = await createUploadFile(formData);

        if ("data" in response) {
          message.success(`${file.name} uploaded successfully.`);
        } else {
          message.error(`Failed to upload ${file.name}.`);
        }
      } else {
        message.error(`No file selected.`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error(`Failed to upload ${file.name}.`);
    }
  };

  return (
    <section className="bg-white py-4 px-4 space-y-4">
      <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
        <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm">
          <p className="font-semibold text-base">Upload all the documents</p>
          <p className="font-normal text-base">
            This must be the name on your registration Documentation.
          </p>
        </div>

        <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
          <form className="space-y-4">
            <div className="flex flex-col gap-[0.3rem]">
              <label
                htmlFor="CAC"
                className="block text-sm font-semibold text-gray-700"
              >
                Attach your CAC
              </label>

              <Dragger
                name="CAC"
                multiple
                action="/api/v1/business/image-upload"
                onChange={handleUpload}
                className="flex items-center text-center  gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document(PDF,Jpeg, PNG only ) Limited 5mb
                </p>
              </Dragger>
            </div>

            <div className="flex flex-col gap-[0.3rem]">
              <label
                htmlFor="memorandum"
                className="block text-sm font-semibold text-gray-700"
              >
                Attach your memorandum and articles of association
              </label>
              <Dragger
                id="memorandum"
                name="memorandum"
                multiple
                action="/api/v1/business/image-upload"
                onChange={handleUpload}
                className="flex items-center text-center  gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document(PDF,Jpeg, PNG only ) Limited 5mb
                </p>
              </Dragger>
            </div>

            <div className="flex flex-col gap-[0.3rem]">
              <label
                htmlFor="TIN"
                className="block text-sm font-semibold text-gray-700"
              >
                Attach your TIN
              </label>
              <Dragger
                id="TIN"
                name="TIN"
                multiple
                action="/api/v1/business/image-upload"
                onChange={handleUpload}
                className="flex items-center text-center gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document(PDF,Jpeg, PNG only ) Limited 5mb
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

export default BusinessDocumentUploadTab;
