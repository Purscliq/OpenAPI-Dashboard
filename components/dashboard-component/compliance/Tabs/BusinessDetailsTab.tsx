import React, { useEffect, useState } from "react";
import {
  CustomInput as Input,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import { message } from "antd";
import {
  useGetbusinessQuery,
  useUpdatebusinessMutation,
} from "@/services/business/index.service";

const BusinessDetailsTab = () => {
  const { data: business, refetch } = useGetbusinessQuery({});
  const [update, { isLoading }] = useUpdatebusinessMutation();
  const [formData, setFormData] = useState({
    address: "",
    business_type: "",
    tin: "",
  });

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.address || !formData.business_type) {
      message.error("Please fill in all fields");
      return;
    }

    update({
      ...formData,
    })
      .unwrap()
      .then((res) => {
        refetch();
        message.success("Business profile updated successfully");
      })
      .catch((error) => {
        console.error("Error updating business:", error);
      })
      .finally(() => setFormData({ address: "", business_type: "", tin: "" }));
  };
  useEffect(() => {
    if (business?.data) {
      setFormData({
        ...formData,
        address: business.data.address || "",
        business_type: business.data.business_type || "",
        tin: business.data.tin || "",
      });
    }
  }, [business]);
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="businessName"
                className="block text-sm font-semibold text-gray-700"
              >
                Business Name
              </label>
              <Input
                type="text"
                id="businessName"
                // name="businessName"
                // placeholder="This is placeholder"
                required
                value={business?.data?.name}
                disabled
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="businessAddress"
                className="block text-sm font-semibold text-gray-700"
              >
                Business Address
              </label>
              <Input
                type="text"
                id="businessAddress"
                name="address"
                placeholder="Enter your business address"
                required
                value={formData.address}
                onChange={handleInputChange}
                disabled={!!business?.data?.address}
                className="p-2 border w-full rounded-md bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="business_type"
                className="block text-sm font-semibold text-gray-700"
              >
                Business Type
              </label>
              <Select
                id="business_type"
                value={formData.business_type}
                onChange={(value) =>
                  setFormData({ ...formData, business_type: value })
                }
                options={[
                  { value: "private", label: "Private" },
                  { value: "public", label: "Public" },
                ]}
                disabled={!!business?.data?.business_type}
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="TIN"
                className="block text-sm font-semibold text-gray-700"
              >
                Enter TIN
              </label>
              <Input
                type="number"
                id="TIN"
                name="tin"
                placeholder="Enter your TIN"
                value={formData.tin}
                disabled={!!business?.data?.tin}
                onChange={handleInputChange}
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="">
              <div className="flex justify-between gap-4 mt-8">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  {isLoading ? "Saving..." : "Save"}
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

export default BusinessDetailsTab;
