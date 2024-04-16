"use client";
import React, { useState } from "react";
import TotalIcon from "@/assets/svg/TotalIcon";
import DisbursIcon from "@/assets/svg/DisbursIcon";
import ColletIcon from "@/assets/svg/ColletIcon";
import TransferIcon from "@/assets/svg/TransferIcon";
import DashboardChart from "./DashboardChart";
import ApiChart from "./ApiChart";
import { Button } from "antd";
import Line from "@/assets/svg/Line";
import { CustomTooltip as Tooltip } from "@/lib/AntdComponents";
import FundModal from "./modal/FundModal";

import {
  useGetMainAccountQuery,
  useGetSubaccountQuery,
  useGetTotalCollectionQuery,
  useGetTotalDisbursementQuery,
  useGetTotalTransferQuery,
  useGetTotalTransactionsQuery,
  useGetApiCallsQuery,
} from "@/services/business/index.service";

const Dashbord = () => {
  const [toogleTooltip, setToogleTooltip] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [withdraw, setWithdraw] = useState(false);

  const { data: mainAccountData, isLoading } = useGetMainAccountQuery({});
  const { data: totalCollectionData } = useGetTotalCollectionQuery({});
  const { data: totalDisbursementData } = useGetTotalDisbursementQuery({});
  const { data: totalTransferData } = useGetTotalTransferQuery({});
  const { data: totalTransactionData } = useGetTotalTransactionsQuery({});
  const { data: subAccountData } = useGetSubaccountQuery({});
  const { data: ApiCallsData } = useGetApiCallsQuery({});

  return (
    <>
      <div className="max-w-[1640px] flex flex-col p-4 space-y-6 overflow-y-scroll">
        <div className="grid lg:grid-cols-[716px_1fr] grid-cols-1 gap-[35px] h-full p-3">
          <section className="flex flex-col space-y-4">
            <h2 className="font-semibold text-lg">Overview</h2>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-[30px]">
              <article className="p-4 bg-black rounded-[20px] space-y-2">
                <div className="flex items-center space-x-2 border-b-[0.5px] border-b-white/30 py-2">
                  <span className="border border-white/30 rounded-full p-1">
                    <TotalIcon />
                  </span>
                  <div>
                    <p className=" font-semibold text-gray-200 mb-2">
                      Total Transaction{" "}
                    </p>
                    <p className="text-sm text-white/50 inline-flex items-center ">
                      <svg
                        className="mr-1"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M9.44425 1.1665H4.55591C2.43258 1.1665 1.16675 2.43234 1.16675 4.55567V9.43817C1.16675 11.5673 2.43258 12.8332 4.55591 12.8332H9.43841C11.5617 12.8332 12.8276 11.5673 12.8276 9.444V4.55567C12.8334 2.43234 11.5676 1.1665 9.44425 1.1665Z"
                          fill="#31D3A3"
                        />
                        <path
                          d="M9.76978 4.0835H6.95228C6.71312 4.0835 6.51478 4.28183 6.51478 4.521C6.51478 4.76016 6.71312 4.9585 6.95228 4.9585H8.71395L4.21062 9.46183C4.04145 9.631 4.04145 9.911 4.21062 10.0802C4.29812 10.1677 4.40895 10.2085 4.51978 10.2085C4.63062 10.2085 4.74145 10.1677 4.82895 10.0802L9.33228 5.57683V7.3385C9.33228 7.57766 9.53062 7.776 9.76978 7.776C10.0089 7.776 10.2073 7.57766 10.2073 7.3385V4.521C10.2073 4.28183 10.0089 4.0835 9.76978 4.0835Z"
                          fill="#31D3A3"
                        />
                      </svg>
                      {totalTransactionData?.data?.percentage_difference} %
                      compared with last month
                    </p>
                  </div>
                </div>

                <p className="text-2xl font-semibold text-white/90 flex items-center justify-between">
                  NGN {totalTransactionData?.data?.total}
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.9301 5.93018L21.0001 12.0002L14.9301 18.0702"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.51 12H20.83"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 12H7.47"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </p>
              </article>
              <article className="p-4 bg-white rounded-[20px] space-y-2 border border-gray-200">
                <div className="flex items-center space-x-2 border-b-[0.5px] border-b-gray-300 py-2">
                  <span className="border border-white/30 rounded-full p-1">
                    <ColletIcon />
                  </span>
                  <div>
                    <p className=" font-bold  mb-2">Total Collection</p>
                    <p className="text-sm text-gray-500 inline-flex items-center ">
                      <svg
                        className="mr-1"
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M9.94413 1.1665H5.05579C2.93246 1.1665 1.66663 2.43234 1.66663 4.55567V9.43817C1.66663 11.5673 2.93246 12.8332 5.05579 12.8332H9.93829C12.0616 12.8332 13.3275 11.5673 13.3275 9.444V4.55567C13.3333 2.43234 12.0675 1.1665 9.94413 1.1665Z"
                          fill="#FE3766"
                        />
                        <path
                          d="M10.2697 4.0835H7.45216C7.21299 4.0835 7.01466 4.28183 7.01466 4.521C7.01466 4.76016 7.21299 4.9585 7.45216 4.9585H9.21383L4.71049 9.46183C4.54133 9.631 4.54133 9.911 4.71049 10.0802C4.79799 10.1677 4.90883 10.2085 5.01966 10.2085C5.13049 10.2085 5.24133 10.1677 5.32883 10.0802L9.83216 5.57683V7.3385C9.83216 7.57766 10.0305 7.776 10.2697 7.776C10.5088 7.776 10.7072 7.57766 10.7072 7.3385V4.521C10.7072 4.28183 10.5088 4.0835 10.2697 4.0835Z"
                          fill="#FE3766"
                        />
                      </svg>
                      {totalCollectionData?.data?.percentage_difference} %
                      compared with last month
                    </p>
                  </div>
                </div>

                <p className="text-2xl font-semibold  flex items-center justify-between">
                  NGN {totalCollectionData?.data?.total}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4301 5.93018L20.5001 12.0002L14.4301 18.0702"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.01 12H20.33"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.5 12H6.97"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </p>
              </article>
              <article className="p-4 bg-white rounded-[20px] space-y-2 border border-gray-200">
                <div className="flex items-center space-x-2 border-b-[0.5px] border-b-gray-300 py-2">
                  <span className="border border-white/30 rounded-full p-1">
                    <TransferIcon />
                  </span>
                  <div>
                    <p className=" font-bold  mb-2">Total Transfer</p>
                    <p className="text-sm text-gray-500 inline-flex items-center ">
                      <svg
                        className="mr-1"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M9.44425 1.1665H4.55591C2.43258 1.1665 1.16675 2.43234 1.16675 4.55567V9.43817C1.16675 11.5673 2.43258 12.8332 4.55591 12.8332H9.43841C11.5617 12.8332 12.8276 11.5673 12.8276 9.444V4.55567C12.8334 2.43234 11.5676 1.1665 9.44425 1.1665Z"
                          fill="#F9BA33"
                        />
                        <path
                          d="M9.76978 4.0835H6.95228C6.71312 4.0835 6.51478 4.28183 6.51478 4.521C6.51478 4.76016 6.71312 4.9585 6.95228 4.9585H8.71395L4.21062 9.46183C4.04145 9.631 4.04145 9.911 4.21062 10.0802C4.29812 10.1677 4.40895 10.2085 4.51978 10.2085C4.63062 10.2085 4.74145 10.1677 4.82895 10.0802L9.33228 5.57683V7.3385C9.33228 7.57766 9.53062 7.776 9.76978 7.776C10.0089 7.776 10.2073 7.57766 10.2073 7.3385V4.521C10.2073 4.28183 10.0089 4.0835 9.76978 4.0835Z"
                          fill="#F9BA33"
                        />
                      </svg>
                      {totalTransferData?.data?.percentage_difference} %
                      compared with last month
                    </p>
                  </div>
                </div>

                <p className="text-2xl font-semibold  flex items-center justify-between">
                  NGN {totalTransferData?.data?.total}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4301 5.93018L20.5001 12.0002L14.4301 18.0702"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.01 12H20.33"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.5 12H6.97"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </p>
              </article>
              <article className="p-4 bg-white rounded-[20px] space-y-2 border border-gray-200">
                <div className="flex items-center space-x-2 border-b-[0.5px] border-b-gray-300 py-2">
                  <span className="border border-white/30 rounded-full p-1">
                    <DisbursIcon />
                  </span>
                  <div>
                    <p className=" font-bold  mb-2">Total Disbursement</p>
                    <p className="text-sm text-gray-500 inline-flex items-center ">
                      <svg
                        className="mr-1"
                        width="15"
                        height="14"
                        viewBox="0 0 15 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M9.94413 1.1665H5.05579C2.93246 1.1665 1.66663 2.43234 1.66663 4.55567V9.43817C1.66663 11.5673 2.93246 12.8332 5.05579 12.8332H9.93829C12.0616 12.8332 13.3275 11.5673 13.3275 9.444V4.55567C13.3333 2.43234 12.0675 1.1665 9.94413 1.1665Z"
                          fill="#1775E4"
                        />
                        <path
                          d="M10.2697 4.0835H7.45216C7.21299 4.0835 7.01466 4.28183 7.01466 4.521C7.01466 4.76016 7.21299 4.9585 7.45216 4.9585H9.21383L4.71049 9.46183C4.54133 9.631 4.54133 9.911 4.71049 10.0802C4.79799 10.1677 4.90883 10.2085 5.01966 10.2085C5.13049 10.2085 5.24133 10.1677 5.32883 10.0802L9.83216 5.57683V7.3385C9.83216 7.57766 10.0305 7.776 10.2697 7.776C10.5088 7.776 10.7072 7.57766 10.7072 7.3385V4.521C10.7072 4.28183 10.5088 4.0835 10.2697 4.0835Z"
                          fill="#1775E4"
                        />
                      </svg>
                      {totalDisbursementData?.data?.percentage_difference} %
                      compared with last month
                    </p>
                  </div>
                </div>

                <p className="text-2xl font-semibold  flex items-center justify-between">
                  NGN {totalDisbursementData?.data?.total}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.4301 5.93018L20.5001 12.0002L14.4301 18.0702"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.01 12H20.33"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.5 12H6.97"
                      stroke="#0D163A"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </p>
              </article>
            </div>
            <article className="border border-gray-200 p-4 rounded-[20px]  flex flex-col space-y-4 bg-white">
              <div className="flex  justify-between items-center p-2">
                <p className="text-[20px] font-bold">Transaction Analytics</p>
                <select
                  className="select text-[#3A3F51]  w-fit h-[2em] !border !border-gray-300 !min-h-[1rem] rounded-[6px]"
                  title="Period"
                >
                  <option selected>Weekly </option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <DashboardChart />
            </article>
          </section>
          <section className="w-full space-y-5">
            <div className="flex flex-col gap-4">
              <article className="flex flex-col space-y-4 bg-white p-[2%]">
                <div className="flex justify-end items-end mb-3">
                  <Tooltip
                    title="copied!"
                    trigger={"click"}
                    open={toogleTooltip}
                  >
                    <Button
                      onClick={() => {
                        setToogleTooltip(true);
                        navigator.clipboard
                          .writeText(
                            `Bank Name: ${mainAccountData?.data?.bank_name} \n Account Name: ${mainAccountData?.data?.account_name} \n Account Number: ${mainAccountData?.data?.account_number}`
                          )
                          .finally(() => {
                            setTimeout(() => {
                              setToogleTooltip(false);
                            }, 2000);
                          });
                      }}
                      className="text-lg font-semibold !border-none"
                    >
                      + copy
                    </Button>
                  </Tooltip>
                </div>
                <span className="flex justify-between items-center">
                  <p className="text-gray-500 ">Bank Name</p>
                  <p className="text-black font-semibold">
                    {mainAccountData?.data?.bank_name}
                  </p>
                </span>
                <span className="flex gap-[0.2rem] justify-between items-center">
                  <p className="text-gray-500 ">Account Name</p>
                  <p className="text-black font-semibold">
                    {mainAccountData?.data?.account_name}
                  </p>
                </span>
                <span className="flex justify-between items-center">
                  <p className="text-gray-500 ">Account Number</p>
                  <p className="text-black font-semibold">
                    {mainAccountData?.data?.account_number}
                  </p>
                </span>
                <span className="flex justify-between items-center">
                  <p className="text-gray-500 ">Account Alias</p>
                  <p className="text-black font-semibold">
                    {mainAccountData?.data?.account_type}
                  </p>
                </span>
              </article>
              <div className="flex justify-end items-center space-x-2">
                <button
                  onClick={() => setIsFundModalOpen(true)}
                  className="font-semibold"
                >
                  + Fund
                </button>
                <button
                  onClick={() => setWithdraw(true)}
                  className="font-semibold"
                >
                  + Withdraw
                </button>
              </div>
            </div>
            {/* <article className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-4 bg-white p-[2%]">
                <div className="flex justify-end items-end mb-3">
                  <Tooltip
                    title="copied!"
                    trigger={"click"}
                    open={toogleTooltip}
                  >
                    <Button
                      onClick={() => {
                        setToogleTooltip(true);
                        navigator.clipboard
                          .writeText(
                            `Bank Name:" \n Account Name:" \n Account Number:"`
                          )
                          .finally(() => {
                            setTimeout(() => {
                              setToogleTooltip(false);
                            }, 2000);
                          });
                      }}
                      className="text-lg font-semibold !border-none"
                    >
                      + copy
                    </Button>
                  </Tooltip>
                </div>{" "}
                <span className="flex justify-between items-center">
                  <p className="text-gray-500 ">First Bank</p>
                  <p className="text-black font-semibold">John Doe </p>
                </span>
                <span className="flex gap-[0.2rem] justify-between items-center">
                  <p className="text-gray-500 ">Account Name</p>
                  <p className="text-black font-semibold">John David Doe</p>
                </span>
                <span className="flex justify-between items-center">
                  <p className="text-gray-500 ">Account Number</p>
                  <p className="text-black font-semibold">45677564567</p>
                </span>
                <span className="flex justify-between items-center">
                  <p className="text-gray-500 ">Account allas</p>
                  <p className="text-black font-semibold">
                    PursFinance main account
                  </p>
                </span>
              </div>
              <div className="flex justify-end items-center space-x-2">
                <button
                  onClick={() => setIsFundModalOpen(true)}
                  className=" font-semibold"
                >
                  + Fund
                </button>
                <button
                  onClick={() => setWithdraw(true)}
                  className=" font-semibold"
                >
                  + Withdraw
                </button>
              </div>
            </article> */}

            <article className="p-4 bg-white rounded-[20px] space-y-2 border border-gray-200">
              <div className="flex items-center space-x-2 border-b-[0.5px] border-b-gray-300 py-2">
                <span className="border border-white/30 rounded-full p-1">
                  <TransferIcon />
                </span>
                <div>
                  <p className=" font-bold  mb-2">Total Balance</p>
                  <p className="text-sm text-gray-500 inline-flex items-center ">
                    <svg
                      className="mr-1"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        opacity="0.4"
                        d="M9.44425 1.1665H4.55591C2.43258 1.1665 1.16675 2.43234 1.16675 4.55567V9.43817C1.16675 11.5673 2.43258 12.8332 4.55591 12.8332H9.43841C11.5617 12.8332 12.8276 11.5673 12.8276 9.444V4.55567C12.8334 2.43234 11.5676 1.1665 9.44425 1.1665Z"
                        fill="#F9BA33"
                      />
                      <path
                        d="M9.76978 4.0835H6.95228C6.71312 4.0835 6.51478 4.28183 6.51478 4.521C6.51478 4.76016 6.71312 4.9585 6.95228 4.9585H8.71395L4.21062 9.46183C4.04145 9.631 4.04145 9.911 4.21062 10.0802C4.29812 10.1677 4.40895 10.2085 4.51978 10.2085C4.63062 10.2085 4.74145 10.1677 4.82895 10.0802L9.33228 5.57683V7.3385C9.33228 7.57766 9.53062 7.776 9.76978 7.776C10.0089 7.776 10.2073 7.57766 10.2073 7.3385V4.521C10.2073 4.28183 10.0089 4.0835 9.76978 4.0835Z"
                        fill="#F9BA33"
                      />
                    </svg>
                    0 % compared with last month{" "}
                  </p>
                </div>
              </div>

              <p className="text-2xl font-semibold  flex items-center justify-between">
                NGN {mainAccountData?.data?.current_balance}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4301 5.93018L20.5001 12.0002L14.4301 18.0702"
                    stroke="#0D163A"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M11.01 12H20.33"
                    stroke="#0D163A"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3.5 12H6.97"
                    stroke="#0D163A"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </p>
            </article>
            <article className="p-4 h-fit w-full border border-gray-200 rounded-[14px] space-y-4 bg-white">
              <div className="flex items-center space-x-3">
                <span className=" flex p-2 items-center bg-yellow-200 rounded-md">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.876 23.9998H8.12401C7.25897 24.0011 6.4603 23.5364 6.03405 22.7837C5.6078 22.0309 5.62009 21.107 6.0662 20.3658L7.84981 17.3834C8.06674 17.0214 8.45782 16.7998 8.87989 16.7998H15.1201C15.5422 16.7998 15.9333 17.0214 16.1502 17.3834L17.9379 20.3717C18.381 21.1132 18.391 22.0356 17.9643 22.7866C17.5375 23.5376 16.7398 24.001 15.876 23.9998Z"
                      fill="#FFAB00"
                    />
                    <path
                      d="M15.876 23.9998H8.12401C7.25897 24.0011 6.4603 23.5364 6.03405 22.7837C5.6078 22.0309 5.62009 21.107 6.0662 20.3658L7.84981 17.3834C8.06674 17.0214 8.45782 16.7998 8.87989 16.7998H15.1201C15.5422 16.7998 15.9333 17.0214 16.1502 17.3834L17.9379 20.3717C18.381 21.1132 18.391 22.0356 17.9643 22.7866C17.5375 23.5376 16.7398 24.001 15.876 23.9998Z"
                      fill="white"
                      fill-opacity="0.4"
                    />
                    <path
                      d="M20.4 19.2H3.6C1.61267 19.1978 0.00216925 17.5873 0 15.6V3.6C0.00216925 1.61267 1.61267 0.00216925 3.6 0H20.4C22.3873 0.00216925 23.9978 1.61267 24 3.6V15.6C23.9978 17.5873 22.3873 19.1978 20.4 19.2Z"
                      fill="#FFAB00"
                    />
                    <path
                      d="M20.4 19.2H3.6C1.61267 19.1978 0.00216925 17.5873 0 15.6V3.6C0.00216925 1.61267 1.61267 0.00216925 3.6 0H20.4C22.3873 0.00216925 23.9978 1.61267 24 3.6V15.6C23.9978 17.5873 22.3873 19.1978 20.4 19.2Z"
                      fill="white"
                      fill-opacity="0.4"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M20.4 19.2002H3.6C1.61177 19.2002 0 17.5884 0 15.6002V13.2002H24V15.6002C24 17.5884 22.3882 19.2002 20.4 19.2002Z"
                      fill="#FFAB00"
                    />
                  </svg>
                </span>
                <p className="text-lg font-semibold">Account</p>
              </div>{" "}
              <div className="flex items-center justify-between px-3">
                <span className="flex flex-col space-y-2">
                  <p className="font-semibold text-slate-400 text-lg">
                    Main Account
                  </p>
                  <p className="font-semibold  text-lg">1</p>
                  <p className="inline-flex items-center text-lg text-green-500">
                    <svg
                      className="mr-1"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.16672 3.51178V11.5001H6.83339V3.51178L10.4109 7.08928L11.5892 5.91094L6.00006 0.321777L0.410889 5.91094L1.58922 7.08928L5.16672 3.51178Z"
                        fill="#71DD37"
                      />
                    </svg>
                    0%
                  </p>
                </span>
                <span className="flex flex-col space-y-2">
                  <p className="font-semibold text-slate-400 text-lg">
                    Sub Account
                  </p>
                  <p className="font-semibold  text-lg">
                    {subAccountData?.data?.length}
                  </p>
                  <p className="inline-flex items-center text-lg text-green-500">
                    <svg
                      className="mr-1"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.16672 3.51178V11.5001H6.83339V3.51178L10.4109 7.08928L11.5892 5.91094L6.00006 0.321777L0.410889 5.91094L1.58922 7.08928L5.16672 3.51178Z"
                        fill="#71DD37"
                      />
                    </svg>
                    0%
                  </p>
                </span>
              </div>
            </article>
            <article className="p-4 h-fit w-full border border-gray-200 rounded-[14px] space-y-4 bg-white">
              <div className="">
                <p className="text-lg font-semibold mb-2">Api Report</p>
                <span className=" flex p-2 items-center bg-yellow-100 rounded-2xl text-yellow-500 w-fit">
                  2024
                </span>
              </div>{" "}
              <div className="flex items-center justify-between w-full">
                <span className="flex flex-col space-y-2">
                  <p className="font-semibold text-green-400 text-sm">
                    Total Api Calls
                  </p>
                  <p className="font-semibold  text-lg">
                    {ApiCallsData?.data?.total_calls}
                  </p>
                </span>
                <Line />
              </div>
            </article>
            {/* <article className=" border border-[#D6DDEB] w-full bg-white p-3 rounded-[20px]">
            <span className="w-full flex justify-between items-center  py-3 border-b ">
              <p className="font-semibold text-lg">Customers</p>
              <p className="text-blue-500">View all</p>
            </span>
            <div className="flex flex-col space-y-6 mt-4">
              <div className="flex space-x-2 items-center">
                <Avatar
                  style={{ backgroundColor: "#CDA4FF" }}
                  size={35}
                  className="!text-sm text-black relative"
                >
                  AM{" "}
                </Avatar>
                <span className="text-sm">
                  <p className=" text-[16px] font-semibold">Ayomide Mayo</p>
                  <p className="text-gray-500 text-xs">August 20, 2022</p>
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <Avatar
                  style={{ backgroundColor: "#CDA4FF" }}
                  size={35}
                  className="!text-sm text-black relative"
                >
                  AM{" "}
                </Avatar>
                <span className="text-sm">
                  <p className=" text-[16px] font-semibold">Ayomide Mayo</p>
                  <p className="text-gray-500 text-xs">August 20, 2022</p>
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <Avatar
                  style={{ backgroundColor: "#CDA4FF" }}
                  size={35}
                  className="!text-sm text-black relative"
                >
                  AM{" "}
                </Avatar>
                <span className="text-sm">
                  <p className=" text-[16px] font-semibold">Ayomide Mayo</p>
                  <p className="text-gray-500 text-xs">August 20, 2022</p>
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <Avatar
                  style={{ backgroundColor: "#CDA4FF" }}
                  size={35}
                  className="!text-sm text-black relative"
                >
                  AM{" "}
                </Avatar>
                <span className="text-sm">
                  <p className=" text-[16px] font-semibold">Ayomide Mayo</p>
                  <p className="text-gray-500 text-xs">August 20, 2022</p>
                </span>
              </div>
            </div>
          </article> */}
          </section>
        </div>
        <article className="border border-gray-200 p-4 rounded-[20px]  flex flex-col gap-6  bg-white w-full overflow-x-auto overflow-hidden">
          <p className="text-[20px] font-bold">API Calls</p>
          <ApiChart />{" "}
        </article>
      </div>
      <FundModal open={isFundModalOpen} setOpen={setIsFundModalOpen} />
    </>
  );
};

export default Dashbord;
