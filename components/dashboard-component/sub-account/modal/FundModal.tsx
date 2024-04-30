import React, { useState } from "react";
import { Modal, Button } from "antd";
import { CustomTooltip as Tooltip } from "@/lib/AntdComponents";

interface SubAccountData {
  account_name: string;
  bank_name: string | null;
  account_type: string;
  updated_at: string;
  account_number: string | null;
  business_id: number;
  bank_code: string | null;
  created_at: string;
  id: number;
  current_balance: number;
}

interface FundModalProps {
  openFundsModal: boolean;
  close: () => void;
  data: SubAccountData | null;
  handleOpenWithdrawal: () => void;
}

const FundModal: React.FC<FundModalProps> = ({
  openFundsModal,
  close,
  handleOpenWithdrawal,
  data,

}) => {
  const [toogleTooltip, setToogleTooltip] = useState(false);

  return (
    <Modal
      open={openFundsModal}
      onCancel={close}
      centered={true}
      footer={[
        <button
          key="withdraw"
          onClick={handleOpenWithdrawal}
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
                  if (data) {
                    navigator.clipboard
                      .writeText(
                        `Bank Name: ${
                          data.bank_name || "N/A"
                        } \n Account Name: ${
                          data.account_name
                        } \n Account Number: ${data.account_number || "N/A"}`
                      )
                      .finally(() => {
                        setTimeout(() => {
                          setToogleTooltip(false);
                        }, 2000);
                      });
                  }
                }}
                className="text-lg !font-semibold !border-none"
              >
                + Copy
              </Button>
            </Tooltip>
          </div>
          {data && (
            <div className="bg-[#FAFAFA] p-3 flex flex-col gap-4">
              <span className="flex justify-between items-center">
                <p className="text-[#515B6F]">Bank Name</p>
                <p className="text-[#181336] font-semibold">
                  {data.bank_name || "N/A"}
                </p>
              </span>
              <span className="flex gap-[0.2rem] justify-between items-center">
                <p className="text-[#515B6F]">Account Name</p>
                <p className="text-[#181336] font-semibold">
                  {data.account_name}
                </p>
              </span>
              <span className="flex justify-between items-center">
                <p className="text-[#515B6F]">Account Number</p>
                <p className="text-[#181336] font-semibold">
                  {data.account_number || "N/A"}
                </p>
              </span>
              <span className="flex justify-between items-center">
                <p className="text-[#515B6F]">Account Alias</p>
                <p className="text-[#181336] font-semibold">
                  {data.account_type}
                </p>
              </span>
            </div>
          )}
        </article>
      </div>
    </Modal>
  );
};

export default FundModal;
