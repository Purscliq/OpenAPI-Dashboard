"use client";

import React, { useState } from "react";
import {  Drawer } from "antd";

const TransactionDrawer = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;

}) => {
 
  return (
    <>
      <Drawer
        onClose={onClose}
        open={open}
        title={null}
        placement="right"
        width={500}
        getContainer={false}
        closable={true}
        style={{ position: "absolute", padding: 0 }}
      >
        <div className="space-y-8 py-4">
         <div className=" bg-slate-50 h-[150px] w-full flex flex-col justify-center items-center">
            <h1 className=" font-bold text-3xl text-[#0AA07B]">+N200,000</h1>
            <p className=" text-xl">JOHN DAVID DOE</p>
         </div>

                <div>
                    <h2 className=" font-semibold text-xl">Transaction Information</h2>
                </div>
          <div className="p-4 border rounded-md space-y-6 border-[#FAFAFA]">
           <div className=" w-full flex justify-between ">
            <span>Amount</span>
            <span className=" font-bold">+200,000.00</span>
           </div>

           <div className=" w-full flex justify-between ">
           <span>Date</span>
            <span>24 July,2023 1:38:28 PM</span>
           </div>
           
           <div className=" w-full flex justify-between ">
           <span>Counterparty</span>
            <span>john David doe</span>
           </div>

           <div className=" w-full flex justify-between ">
           <span>Bank Name</span>
            <span>First Bank</span>
           </div>

           <div className=" w-full flex justify-between ">
           <span>Account Number</span>
            <span>05596746787</span>
           </div>

           <div className=" w-full flex justify-between ">
           <span>Source</span>
            <span>PursBusiness main Account</span>
           </div>
           <hr/>

           <div className=" w-full ">
            <h4 className=" font-bold text-md">Transaction Memo</h4>
            <p>inward transfer  from king ans son</p>
           </div>
          </div>
          <button className=" w-full text-center h-[50px] bg-black text-white rounded mb-4 font-semibold">Download Receipt</button>
          <button className=" w-full text-center h-[50px] bg-white text-black border border-slate-200 rounded font-semibold">Report Transaction</button>
        </div>
      </Drawer>
    </>
  );
};

export default TransactionDrawer;
