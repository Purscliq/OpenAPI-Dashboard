import React from "react";

const InfoTab = () => {
  return (
    <div className="p-4 border-y grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">First Name</p>
        <p className="text-[#25324B] text-base font-bold">Temitope</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Last Name</p>
        <p className="text-[#25324B] text-base font-bold">Williams</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Date of Birth</p>
        <p className="text-[#25324B] text-base font-bold">January 31, 1997</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Phone</p>
        <p className="text-[#25324B] text-base font-bold">08164626619</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">User Type</p>
        <p className="text-[#25324B] text-base font-bold">Individual</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">City</p>
        <p className="text-[#25324B] text-base font-bold">Mainland</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Street</p>
        <p className="text-[#25324B] text-base font-bold">Franklin</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Postal code</p>
        <p className="text-[#25324B] text-base font-bold">1000111</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Country</p>
        <p className="text-[#25324B] text-base font-bold">Nigeria</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">State</p>
        <p className="text-[#25324B] text-base font-bold">Lagos</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Address</p>
        <p className="text-[#25324B] text-base font-bold">23456789344</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">BVN</p>
        <p className="text-[#25324B] text-base font-bold">3444678099735</p>
      </span>
    </div>
  );
};

export default InfoTab;
