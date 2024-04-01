import React from "react";
import CustomersTable from "./CustomersTable";
import Link from "next/link";

const Customers = () => {
  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <span className="flex gap-8 justify-between">
        <h2 className="text-[24px] font-bold mb-1"> Customers </h2>
        <Link
          href="/customers/add"
          className="bg-black text-white rounded-[5px] px-[24px] py-[12px] text-base font-semibold"
        >
          Add Customer
        </Link>
      </span>

      <div className="space-y-4">
        <CustomersTable />
      </div>
    </section>
  );
};

export default Customers;
