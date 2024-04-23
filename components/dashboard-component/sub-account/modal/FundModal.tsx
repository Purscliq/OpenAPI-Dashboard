"use client";

import React, { useState } from "react";
import { Modal, Button } from "antd";
import { CustomTooltip as Tooltip } from "@/lib/AntdComponents";

import { useGetSubaccountQuery } from "@/services/business/index.service";

interface FundModalProps {
  openFundsModal: boolean;
  close: () => void;
  handleOpenWithdrawalModal: () => void;
}

const FundModal: React.FC<FundModalProps> = ({
  openFundsModal,
  close,
  handleOpenWithdrawalModal,
}) => {
  const [toogleTooltip, setToogleTooltip] = useState(false);
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const { data: subAccountData } = useGetSubaccountQuery({});

  return (
    <Modal
      // title="Details"
      open={openFundsModal}
      onCancel={close}
      footer={[
        <button
          key="withdraw"
          onClick={handleOpenWithdrawalModal}
          className="bg-[#010101] text-white px-[24px] py-[12px] rounded-[5px]"
        >
          Withdraw
        </button>,
      ]}
    >
      <div className="flex flex-col gap-4">
        <article className="flex flex-col space-y-4 bg-white p-[2%]">
          <h2 className="text-[32px] text-black font-bold text-center pt-5">
            Fund Sub-Account
          </h2>
          <div className="flex justify-end items-end">
            <Tooltip title="copied!" trigger={"click"} open={toogleTooltip}>
              <Button
                onClick={() => {
                  setToogleTooltip(true);
                  navigator.clipboard
                    .writeText(
                      `Bank Name: ${subAccountData?.data?.bank_name} \n Account Name: ${subAccountData?.data?.account_name} \n Account Number: ${subAccountData?.data?.account_number}`
                    )
                    .finally(() => {
                      setTimeout(() => {
                        setToogleTooltip(false);
                      }, 2000);
                    });
                }}
                className="text-lg !font-semibold !border-none"
              >
                + Copy
              </Button>
            </Tooltip>
          </div>
          <div className="bg-[#FAFAFA] p-3 flex flex-col gap-4">
            <span className="flex justify-between items-center">
              <p className="text-[#515B6F]">Bank Name</p>
              <p className="text-[#181336] font-semibold">
                {subAccountData?.data?.bank_name || "First Bank"}
              </p>
            </span>
            <span className="flex gap-[0.2rem] justify-between items-center">
              <p className="text-[#515B6F]">Account Name</p>
              <p className="text-[#181336] font-semibold">
                {subAccountData?.data?.account_name || "John David Doe"}
              </p>
            </span>
            <span className="flex justify-between items-center">
              <p className="text-[#515B6F]">Account Number</p>
              <p className="text-[#181336] font-semibold">
                {subAccountData?.data?.account_number || "9955667794"}
              </p>
            </span>
            <span className="flex justify-between items-center">
              <p className="text-[#515B6F]">Account Alias</p>
              <p className="text-[#181336] font-semibold">
                {subAccountData?.data?.account_type || "Purs main current account"}
              </p>
            </span>
          </div>
        </article>
      </div>
    </Modal>
  );
};

export default FundModal;
