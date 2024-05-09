import React, { FormEventHandler, useState } from "react";
import { message, Upload } from "antd";
import AttachIcon from "@/assets/svg/AttachIcon";
import type { UploadProps, UploadFile } from "antd";
import {
  useCreateUploadFileMutation,
  useGetbusinessQuery,
  useUpdatebusinessMutation,
} from "@/services/business/index.service";
import { useRouter } from "next/navigation";
import { UploadChangeParam } from "antd/es/upload";

const { Dragger } = Upload;

const BusinessDocumentUploadTab = () => {
  const router = useRouter();
  const [createUploadFile] = useCreateUploadFileMutation();
  const [update, { isLoading }] = useUpdatebusinessMutation();
  const { data: business, refetch } = useGetbusinessQuery({});

  const [upload_url, setUploadUrl] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    update({
      cac_url: upload_url,
      tin_url: upload_url,
      moa_url: upload_url,
    })
      .unwrap()
      .then((res) => {
        refetch();
        message.success("BusinessDocument updated successfully");
      })
      .catch((error) => {
        console.error("Error updating director:", error);
      });
  };

  const handleUpload = (
    info: UploadChangeParam<UploadFile>,
    fieldName: string
  ) => {
    if (info.file.originFileObj) {
      const formData = new FormData();
      formData.append("file", info.file.originFileObj);
      createUploadFile(formData)
        .unwrap()
        .then((res) => {
          const uploadedUrl = res.data.upload_url;
          setUploadUrl(uploadedUrl);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-[0.3rem]">
              <label
                htmlFor="CAC"
                className="block text-sm font-semibold text-gray-700"
              >
                Attach your CAC
              </label>

              <Dragger
                name="cac_url"
                multiple
                accept="application/pdf, image/jpeg"
                action="/api/v1/business/image-upload"
                disabled={!!business?.data?.cac_url}
                onChange={(info) => handleUpload(info, " cac_url")}
                className="flex items-center text-center  gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document (PDF only) Limited 5mb
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
                name="moa_url"
                multiple
                accept="application/pdf, image/jpeg"
                action="/api/v1/business/image-upload"
                disabled={!!business?.data?.moa_url}
                onChange={(info) => handleUpload(info, " moa_url")}
                className="flex items-center text-center  gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document (PDF only) Limited 5mb
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
                name=" tin_url"
                multiple
                accept="application/pdf, image/jpeg"
                action="/api/v1/business/image-upload"
                onChange={(info) => handleUpload(info, " tin_url")}
                disabled={!!business?.data?.tin_url}
                className="flex items-center text-center gap-[0.3rem]"
              >
                <p className="ant-upload-text flex gap-4">
                  <AttachIcon />
                  Attach Document (PDF, JPEG only) Limited 5mb
                </p>
              </Dragger>
            </div>

            <div className="">
              <div className="flex justify-between gap-4 mt-8">
                <button
                  type="submit"
                  className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  {isLoading ? "Saving..." : "Save"}{" "}
                </button>
                <button
                  type="button"
                  // onClick={() => router.push("/about")}
                  onClick={() => router.back()}
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
