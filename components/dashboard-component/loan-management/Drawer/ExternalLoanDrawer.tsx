"use client";

import React, { useState } from "react";
import { Button, Drawer } from "antd";

const ExternalLoanDrawer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        Details
      </Button>

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
          <p className="font-semibold text-[16px]">External Loan Details</p>

          <div className="p-4 border rounded-md space-y-6">
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Name</p>
              <p className="text-[14px] font-bold text-[#181336]">
                Temitope Williams
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Email</p>
              <p className="text-[14px] font-bold text-[#181336]">
                temitopeml@mail.com
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Type</p>
              <p className="text-[14px] font-bold text-[#181336]">Email</p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Phone number</p>
              <p className="text-[14px] font-bold text-[#181336]">
                80164626619
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Initiated on</p>
              <p className="text-[14px] font-bold text-[#181336]">
                Feb 9, 2024 12:24AM
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Status</p>
              <p className="text-[14px] font-bold text-[#1AD48E]">Sent</p>
            </span>

            {/* Loan Product Details */}
            <div className="p-4 bg-[#F9FFFF] space-y-8 py-4">
              <p className="font-semibold text-[16px] text-center">
                Loan Product Details
              </p>

              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">Minimum Amount</p>
                <p className="text-[14px] font-bold text-[#181336]">
                  NGN 5000.00
                </p>
              </span>
              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">Maximum Amount</p>
                <p className="text-[14px] font-bold text-[#181336]">
                  NGN 5000.00
                </p>
              </span>
              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">Minimum Tenor</p>
                <p className="text-[14px] font-bold text-[#181336]">
                  5000 Months
                </p>
              </span>
              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">Maximum Tenor</p>
                <p className="text-[14px] font-bold text-[#181336]">
                  100000 Weeks
                </p>
              </span>
              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">
                  Interest Rate & Period
                </p>
                <p className="text-[14px] font-bold text-[#181336]">
                  10% Daily
                </p>
              </span>
              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">Payment Frequency</p>
                <p className="text-[14px] font-bold text-[#181336]">Monthly</p>
              </span>
              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">Disbursement Method</p>
                <p className="text-[14px] font-bold text-[#181336]">Wallet</p>
              </span>
              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">Gurantor Required</p>
                <p className="text-[14px] font-bold text-[#181336]">False</p>
              </span>
              <span className="flex justify-between">
                <p className="text-base text-[#515B6F]">Multiple Tenor</p>
                <p className="text-[14px] font-bold text-[#181336]">True</p>
              </span>
            </div>
            <hr />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default ExternalLoanDrawer;
