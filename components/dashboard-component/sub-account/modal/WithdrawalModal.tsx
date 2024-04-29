import React from "react";
import { Modal } from "antd";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import { useGetBankListQuery } from "@/services/business/index.service";
interface ModalProps {
  openWithdrawalModal: boolean;
  close: () => void;
}

const WithdrawalModal: React.FC<ModalProps> = ({
  openWithdrawalModal,
  close,
}) => {

  const {data:bankLList} = useGetBankListQuery({})
  return (
    <Modal
      // title="Withdrawal"
      open={openWithdrawalModal}
      onCancel={close}
      footer={null}
    >
      <div className="pt-5 space-y-6">
        <span className="flex flex-col justify-center">
          <h2 className="md:text-[32px] text-[18px] text-black font-bold text-center">
            Withdraw Account
          </h2>
          <p className="text-center text-[14px] md:text-[18px] text-[#515B6F]">
            Enter the details to withdrawal from account
          </p>
        </span>

        <form className="space-y-4">
          <span className="flex flex-col gap-1">
            <label
              htmlFor="account"
              className="text-[#24272C] text-base font-bold"
            >
              Select Account
            </label>
            <Select
              placeholder=""
              className="!w-full !h-[40px]"
              id="account"
              options={[
                { value: "account1", label: "Account1" },
                { value: "account2", label: "Account2" },
                { value: "account3", label: "Account3" },
              ]}
            />
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="bank"
              className="text-[#24272C] text-base font-bold"
            >
              Select Bank
            </label>
            <Select
              placeholder=""
              className="!w-full !h-[40px]"
              id="bank"
              options={[
                { value: "bank1", label: "Bank1" },
                { value: "bank2", label: "Bank2" },
                { value: "bank3", label: "Bank3" },
              ]}
            />
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="accountNo"
              className="text-[#24272C] text-base font-bold"
            >
              Account Number
            </label>
            <input
              type="number"
              id="accountNo"
              className="w-full rounded-[5px] px-[8px] pr-[16px] h-[50px] text-[14px] border border-[#E9EBEB]"
              required
            />
            <p className="text-[#515B6F] text-[14px]">Temitope williams</p>
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="amount"
              className="text-[#24272C] text-base font-bold"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              className="w-full rounded-[5px] px-[8px] pr-[16px] h-[50px] text-[14px] border border-[#E9EBEB]"
              required
            />
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="narration"
              className="text-[#24272C] text-base font-bold"
            >
              Narration
            </label>
            <input
              type="text"
              id="narration"
              className="w-full rounded-[5px] px-[8px] pr-[16px] h-[50px] text-[14px] border border-[#E9EBEB]"
              required
            />
          </span>
          <span className="flex md:justify-end pt-4">
            <button
              type="submit"
              className="bg-[#010101] text-white px-[24px] py-[12px] rounded-[5px]"
            >
              Withdraw
            </button>
          </span>
        </form>
      </div>
    </Modal>
  );
};

export default WithdrawalModal;
