"use client";

import React from "react";
import Link from "next/link";
import {
  CustomInput as Input,
  CustomDatePicker as DatePicker,
} from "@/lib/AntdComponents";
import { Select } from "antd";

const { Option } = Select;

const selectBefore = (
  <Select defaultValue="10">
    <Option value="10">10</Option>
    <Option value="20">20</Option>
    <Option value="30">30</Option>
  </Select>
);

const NewLoans = () => {
  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <span>
        <h2 className="text-[24px] font-bold mb-1">
          Loan Management &gt;{" "}
          <Link href="/loan-management/loans" className="hover:underline">
            Loans
          </Link>{" "}
          &gt;{" "}
          <Link href="#" className="hover:underline">
            New Loans
          </Link>
        </h2>
      </span>

      <section className="bg-white py-4 px-4 space-y-4">
        <div className="sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
          <div className="p-2 col-span-3 space-y-2 w-full md:max-w-sm">
            <p className="font-semibold text-base">Loan Details</p>
            <p className="font-normal text-base">
              Fill the necessary form to apply for a new loan
            </p>
          </div>

          <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
            <form className="space-y-4">
              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="BVN"
                  className="block text-sm font-semibold text-gray-700"
                >
                  BVN
                </label>

                <Input
                  type="number"
                  id="BVN"
                  name="BVN"
                  placeholder="1234567890"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="product"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Product
                </label>

                <Select
                  id="product"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "product1", label: "Product1" },
                    { value: "product2", label: "Product2" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>
              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="product"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Disbursement Method
                </label>

                <Select
                  id="product"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "method1", label: "Method1" },
                    { value: "method1", label: "Method2" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
                <label
                  htmlFor="amount"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Amount
                </label>

                <Input
                  type="number"
                  id="anount"
                  name="first_name"
                  placeholder="150,000"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="tenor"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Loan Tenor
                </label>

                <Input
                  addonBefore={selectBefore}
                  defaultValue=""
                  type="number"
                  id="tenor"
                  name="loan tenor"
                  placeholder="5"
                  required
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="purpose"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Purpose
                </label>

                <Select
                  id="purpose"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "self", label: "Self" },
                    { value: "other", label: "Other" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="maritalStatus"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Marital Status
                </label>

                <Select
                  id="maritalStatus"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "single", label: "Single" },
                    { value: "married", label: "Married" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="dependent"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Number of dependent
                </label>

                <Select
                  id="dependent"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "0", label: "None" },
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                    { value: "4", label: "4" },
                    { value: "5", label: "5" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="residence"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Type of residence
                </label>

                <Select
                  id="residence"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "1 storey", label: "1 Storey" },
                    { value: "2 storey", label: "2 Storey" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="Address"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Location
                </label>

                <Input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="123 Main Street"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Education Attainment
                </label>

                <Select
                  id="RegCountry"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "Level 1", label: "Level 1" },
                    { value: "Level 2", label: "Level 2" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="employment"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Sector of employment
                </label>

                <Select
                  id="employment"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "public", label: "Public" },
                    { value: "private", label: "Private" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Employment category
                </label>

                <Select
                  id="category"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "category 1", label: "Category 1" },
                    { value: "category 2", label: "Category 2" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="income"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Monthly net income
                </label>

                <Select
                  id="income"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "50,000", label: "50,000" },
                    { value: "100,000", label: "100,000" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="status"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Employment status
                </label>

                <Select
                  id="status"
                  defaultValue=""
                  options={[
                    { value: "", label: "Select an option" },
                    { value: "employed", label: "Employed" },
                    { value: "unemployed", label: "Unemployed" },
                  ]}
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-none"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="workStartDate"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Work start date
                </label>
                <DatePicker className="w-full" />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Work email
                </label>

                <Input
                  type="email"
                  id="email"
                  name="work email"
                  placeholder="john@doe.mail"
                  required
                  className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="flex flex-col items-start justify-start gap-[0.3rem]">
                <label
                  htmlFor="CurrentEmployer"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Current Employer
                </label>

                <Input
                  type="text"
                  id="CurrentEmployer"
                  name="Current Employer"
                  placeholder="Employer"
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
                    Book New Loan
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

export default NewLoans;
