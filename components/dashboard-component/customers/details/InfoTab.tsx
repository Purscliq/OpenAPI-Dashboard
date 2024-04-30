import React from "react";
import { Skeleton } from 'antd';
import { useGetSingleCustomerQuery } from "@/services/business/index.service";
import { formatDate } from "@/helpers/dateFormat";

const InfoTab = () => {
  const id = sessionStorage.getItem("customer_id")
  const {data: customerData, isLoading} = useGetSingleCustomerQuery(id)
  
  // Function to format date of birth
 

  return (
    <div className="p-4 border-y grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4">

   {  isLoading === true ?  
   (
    <Skeleton active/>
   )
   :
   (
   <>
   <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">First Name</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.firstName}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Last Name</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.lastName}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Date of Birth</p>
        <p className="text-[#25324B] text-base font-bold">{formatDate(customerData?.data?.dob)}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Phone</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.phone}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">User Type</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.userType}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">City</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.city}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Street</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.street}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Postal code</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.postalCode}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Country</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.country}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">State</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.state}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">Address</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.address}</p>
      </span>
      <span className="flex flex-col gap-2 text-[14px]">
        <p className="text-[#7C88B1]">BVN</p>
        <p className="text-[#25324B] text-base font-bold">{customerData?.data?.bvn}</p>
      </span>
      </>
      )
      }
    </div>
  );
};

export default InfoTab;
