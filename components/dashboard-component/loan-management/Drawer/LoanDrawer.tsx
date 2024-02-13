"use client";

import React, { useState } from "react";
import { Button, Drawer } from "antd";

const LoanDrawer = () => {
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
        Drawer
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
          <p className="font-semibold text-[18px]">Loan History</p>

          <div className="p-4 border rounded-md space-y-6">
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Name</p>
              <p className="text-[14px] font-bold text-[#181336]">
                Temitope Williams
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Date</p>
              <p className="text-[14px] font-bold text-[#181336]">
                Feb 9, 2024 12:24AM
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Count</p>
              <p className="text-[14px] font-bold text-[#181336]">2</p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Disbursed</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN 5000.00
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Interest</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN 5000.00
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Account number</p>
              <p className="text-[14px] font-bold text-[#181336]">0170586233</p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Fees</p>
              <p className="text-[14px] font-bold text-[#181336]">NGN 100</p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Status</p>
              <p className="text-[14px] font-bold text-[#F6513B]">
                Past due loan
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Penalty</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN 1000.00
              </p>
            </span>
            <span className="flex justify-between">
              <p className="text-base text-[#515B6F]">Total fees</p>
              <p className="text-[14px] font-bold text-[#181336]">
                NGN 10000.00
              </p>
            </span>

            <hr />
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default LoanDrawer;
