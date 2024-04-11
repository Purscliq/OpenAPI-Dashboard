"use client";
import React, { useState, useEffect } from "react";
import { Input, message } from "antd";
import {
  useGetbusinessQuery,
  useUpdatebusinessMutation,
} from "@/services/business/index.service";
import { LoadingOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const BusinessProfileTab = () => {
  const {
    data: business,
    refetch,
    isLoading: isgetting,
  } = useGetbusinessQuery({});
  console.log(business?.data);
  const [update, { isLoading }] = useUpdatebusinessMutation({});
  const [formData, setFormData] = useState({
    email: "",
    description: "",
    phone: "",
    support_email: "",
    support_phone: "",
  });

  useEffect(() => {
    if (business?.data) {
      setFormData({
        email: business.data.email,
        description: business.data.description,
        phone: business.data.phone,
        support_email: business.data.support_email,
        support_phone: business.data.support_phone,
      });
    }
  }, [business]);

  const updateBusiness = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formData.email === "" ||
      formData.description === "" ||
      formData.phone === ""
    ) {
      message.error("Please fill in all the required fields");
      return;
    }

    update({
      ...formData,
    })
      .unwrap()
      .then((res) => {
        message.success("Business profile updated successfully");
        refetch();
      })
      .catch((error) => {
        console.error("Error updating business:", error);
      });
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className="bg- py-4 px-0 space-y-4">
      <div className="border-b pb-2">
        <p className="font-semibold text-base">Business Profile</p>
        <p className="font-normal text-base text-[#7C8493]">
          This is business information that you can update anytime.
        </p>
      </div>

      <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
        <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm">
          <p className="font-semibold text-base">Business Details</p>
        </div>
        <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
          <form onSubmit={updateBusiness} className="space-y-4">
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700"
              >
                Business Name
              </label>

              <Input
                type="text"
                id="name"
                name="name"
                placeholder="This is placeholder"
                required
                value={business?.data?.name}
                disabled
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>{" "}
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border w-full rounded-md  bg-gray-500 text-sm text-gray-500 shadow-sm"
            />
            <TextArea
              rows={4}
              name="description"
              placeholder="Business Description"
              value={formData.description}
              onChange={handleInputChange}
              className="p-2 border w-full rounded-md  bg-gray-500 text-sm text-gray-500 shadow-sm"
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-2 border w-full rounded-md  bg-gray-500 text-sm text-gray-500 shadow-sm"
            />
            <Input
              type="email"
              name="support_email"
              placeholder="Support Email"
              value={formData.support_email}
              onChange={handleInputChange}
              className="p-2 border w-full rounded-md  bg-gray-500 text-sm text-gray-500 shadow-sm"
            />
            <Input
              type="tel"
              name="support_phone"
              placeholder="Support Phone"
              value={formData.support_phone}
              onChange={handleInputChange}
              className="p-2 border w-full rounded-md  bg-gray-500 text-sm text-gray-500 shadow-sm"
            />
            <div className="">
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BusinessProfileTab;
