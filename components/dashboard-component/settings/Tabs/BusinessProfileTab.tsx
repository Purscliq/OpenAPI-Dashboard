import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const BusinessProfileTab = () => {
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
          <form className="space-y-4">
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
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700"
              >
                Business Description
              </label>

              <TextArea
                rows={4}
                id="description"
                placeholder="This is placeholder"
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
                name="phone number"
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="SupportEmail"
                className="block text-sm font-semibold text-gray-700"
              >
                Support Email
              </label>

              <Input
                type="email"
                id="SupportEmail"
                name="support email"
                placeholder="This is placeholder"
                required
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="SupportPhone"
                className="block text-sm font-semibold text-gray-700"
              >
                Support Phone
              </label>

              <Input
                type="tel"
                id="SupportPhone"
                name="support phone"
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

export default BusinessProfileTab;
