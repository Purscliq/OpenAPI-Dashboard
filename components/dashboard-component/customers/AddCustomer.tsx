"use client";

import React, { useEffect, useState } from "react";
import {
  CustomInput as Input,
  CustomDatePicker as DatePicker,
} from "@/lib/AntdComponents";
import { Select } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";

import ImageIcon from "@/assets/svg/ImageIcon";
import AttachIcon from "@/assets/svg/AttachIcon";
import {
  useCreateCustomerMutation,
  useCreateUploadFileMutation,
} from "@/services/business/index.service";
import { LoadingOutlined } from "@ant-design/icons";
import { RcFile, UploadChangeParam } from "antd/es/upload";
import { useRouter } from "next/navigation";

const { Option } = Select;
const { Dragger } = Upload;

const selectBefore = (
  <Select defaultValue="+234">
    <Option value="+234">+234</Option>
    <Option value="+233">+233</Option>
  </Select>
);

const AddCustomer = () => {
  // const [accessToken, setAccessToken] = useState<string>()
  const [formData, setFormData] = useState({
    userType: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: null,
    postalCode: "",
    country: "",
    state: "",
    city: "",
    street: "",
    address: "",
    kycType: "",
    bvn: "",
    idCard: null,
    utilityBill: null,
  });
  const [createCustomer, { isLoading }] = useCreateCustomerMutation();
  const [createFileUpload, { isLoading: loading }] =
    useCreateUploadFileMutation();
  const route = useRouter();
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     setAccessToken(token)
  //   }
  // }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSelectChange = (value: string, fieldName: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleDateChange = (date: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      dob: date ? date.toDate() : null, // Convert moment object to Date object
    }));
  };
  const handleFileUpload = (file: any, name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: file,
    }));
    message.success(`${file.name} file uploaded successfully.`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer(formData).then(() => {
        message.success("Customer Created");
        route.push("customers");
      });
      // Handle success
    } catch (error) {
      message.error("Failed to create customer");
      // Handle error
    }
  };

  const customRequest = async ({
    file,
    onSuccess,
    onError,
  }: {
    file: RcFile;
    onSuccess: Function;
    onError: Function;
  }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Define onProgress function here
      const onProgress = (progressEvent: any) => {
        // Update progress bar UI based on progressEvent.percent
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        // Notify about progress
        console.log(`Upload progress: ${percentCompleted}%`);
      };

      // Make the RTK Query mutation call to upload the file
      const response = await createFileUpload(formData);

      // Handle success
      if ("data" in response) {
        onSuccess(file); // Notify Ant Design that the file has been successfully uploaded
        message.success(`${file.name} uploaded successfully`);
      } else {
        onError(new Error("File upload failed")); // Notify Ant Design about the error
        message.error("File upload failed");
      }
    } catch (error) {
      onError(error); // Notify Ant Design about the error
      message.error("File upload failed");
    }
  };

  const onProgress = (progressEvent: any) => {
    // Update progress bar UI based on progressEvent.percent
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
  };

  const test = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="customerType"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Choose A Customer Type
                </label>

                <Select
                  id="userType"
                  defaultValue=""
                  value={formData.userType} // Value from formData
                  onChange={(value) => handleSelectChange(value, "userType")}
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "Business", label: "Business" },
                    { value: "Individual", label: "Individual" },
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
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
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
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
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
                  name="phone"
                  placeholder="801234567890"
                  value={formData.phone}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                <DatePicker className="w-full" onChange={handleDateChange} />
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
                  name="postalCode"
                  placeholder="This is placeholder"
                  value={formData.postalCode}
                  onChange={handleChange}
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
                  value={formData.country} // Value from formData
                  onChange={(value) => handleSelectChange(value, "country")}
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
                  value={formData.state} // Value from formData
                  onChange={(value) => handleSelectChange(value, "state")}
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
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Street
                </label>

                <Input
                  type="text"
                  id="street"
                  name="street"
                  placeholder="Street Name"
                  value={formData.street}
                  onChange={handleChange}
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
                  value={formData.address}
                  onChange={handleChange}
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
                  name="kycType"
                  placeholder="This is placeholder"
                  value={formData.kycType}
                  onChange={handleChange}
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
                  id="bvn"
                  name="bvn"
                  placeholder="This is placeholder"
                  value={formData.bvn}
                  onChange={handleChange}
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
                  id="IDCard"
                  name="idCard"
                  customRequest={({ file }) =>
                    customRequest({
                      file: file as RcFile,
                      onSuccess: (file: UploadFile) => {
                        file.status = "done";
                      },
                      onError: () => {},
                    })
                  }
                  onDrop={(e) =>
                    console.log("Dropped files", e.dataTransfer.files)
                  } // Optional drop handling
                  className="flex items-center text-center gap-[0.3rem]"
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
                  //{...props}
                  id="utilityBill"
                  name="utilityBill"
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
                    {!isLoading ? (
                      " Save"
                    ) : (
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    )}
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
