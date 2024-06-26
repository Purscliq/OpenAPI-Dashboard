import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import {
  useGetAccountNameMutation,
  useGetBankListQuery,
  useInitiateWithdrawalMutation,
} from "@/services/business/index.service";
import { LoadingOutlined } from "@ant-design/icons";
interface ModalProps {
  openWithdrawalModal: boolean;
  close: () => void;
  accountId: number;
}

const WithdrawalModal: React.FC<ModalProps> = ({
  openWithdrawalModal,
  close,
  accountId,
}) => {
  const { data: bankList } = useGetBankListQuery({});
  const [initiateWithdrawal, { isLoading, data: response }] =
    useInitiateWithdrawalMutation();
  const [validate, { isLoading: vallidating, isError: validatingError }] =
    useGetAccountNameMutation();

  const [formData, setFormData] = useState({
    source_account_id: accountId,
    bank_code: "",
    account_number: "",
    amount: "",
    narration: "",
  });

  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    // Check if both bank_code and account_number are available
    if (
      formData.bank_code &&
      formData.account_number &&
      formData.account_number.length === 10
    ) {
      validate({
        bank_code: formData.bank_code,
        account_number: formData.account_number,
      })
        .unwrap()
        .then((res) => {
          setAccountName(res?.data?.account_name);
          console.log("Validation successful");

          if (res.status === 400) {
            setAccountName(res?.message);
          }
        })
        .catch((error: any) => {
          // Handle validation failure
          setAccountName("Error validating name");
          console.error("Validation failed", error);
        });
    }
  }, [formData.bank_code, formData.account_number, validate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue = name === "amount" ? parseFloat(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  const handleSelectChange = (value: string, fieldName: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await initiateWithdrawal(formData)
        .unwrap()
        .then(() => {
          message.success("Withdrawal successful");
          setFormData({
            source_account_id: accountId,
            bank_code: "",
            account_number: "",
            amount: "",
            narration: "",
          });
        });
    } catch (error: any) {
      message.error(`Withdrawal failed: ${error?.data?.message}`);
      console.log(error?.data?.message);
    }
  };

  return (
    <Modal
      open={openWithdrawalModal}
      onCancel={close}
      footer={null}
      centered={true}
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

        <form className="space-y-4" onSubmit={handleWithdrawal}>
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
              value={formData.bank_code}
              onChange={(value) => handleSelectChange(value, "bank_code")}
              options={bankList?.data?.map((bank: any) => ({
                value: bank.bank_code,
                label: bank.bank_name,
              }))}
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
              name="account_number"
              type="number"
              id="accountNo"
              value={formData.account_number}
              onChange={handleChange}
              className="w-full rounded-[5px] px-[8px] pr-[16px] h-[50px] text-[14px] border border-[#E9EBEB]"
              required
            />
            <p
              className={`text-[#515B6F] text-[14px] ${
                validatingError ? "text-red-600" : ""
              }`}
            >
              {vallidating ? (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              ) : (
                accountName
              )}
            </p>
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="amount"
              className="text-[#24272C] text-base font-bold"
            >
              Amount
            </label>
            <input
              name="amount"
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
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
              name="narration"
              type="text"
              id="narration"
              value={formData.narration}
              onChange={handleChange}
              className="w-full rounded-[5px] px-[8px] pr-[16px] h-[50px] text-[14px] border border-[#E9EBEB]"
              required
            />
          </span>
          <span className="flex md:justify-end pt-4">
            <button
              type="submit"
              className="bg-[#010101] text-white px-[24px] py-[12px] rounded-[5px]"
            >
              {isLoading ? (
                <LoadingOutlined style={{ fontSize: 24 }} spin />
              ) : (
                "Withdraw"
              )}
            </button>
          </span>
        </form>
      </div>
    </Modal>
  );
};

export default WithdrawalModal;
