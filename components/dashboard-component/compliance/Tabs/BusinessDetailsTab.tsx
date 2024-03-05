import React from "react";
import {
  CustomInput as Input,
  CustomSelect as Select,
} from "@/lib/AntdComponents";

const BusinessDetailsTab = () => {
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
                Business Name
              </label>

              <Input
                type="text"
                id="BVN"
                name="BVN"
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="FirstName"
                className="block text-sm font-semibold text-gray-700"
              >
                Business Address
              </label>

              <Input
                type="text"
                id="FirstName"
                name="first_name"
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="businessType"
                className="block text-sm font-semibold text-gray-700"
              >
                Business Type
              </label>

              <Select
                id="businessType"
                defaultValue=""
                options={[
                  { value: "", label: "Select an option" },
                  { value: "private", label: "Private" },
                  { value: "public", label: "Public" },
                ]}
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
                name="residential address"
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="TIN2"
                className="block text-sm font-semibold text-gray-700"
              >
                Enter TIN
              </label>

              <Input
                type="number"
                id="TIN2"
                name="residential address"
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
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

export default BusinessDetailsTab;
