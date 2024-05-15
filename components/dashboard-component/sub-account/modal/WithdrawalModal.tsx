import React, { useEffect, useState } from "react";
import { message, Modal } from "antd";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import { useGetAccountNameMutation, useGetBankListQuery, useInitiateWithdrawalMutation } from "@/services/business/index.service";
import { LoadingOutlined } from "@ant-design/icons";
interface ModalProps {
  openWithdrawalModal: boolean;
  close: () => void;
  accountData: { id: number; account_name: string }[];
  mainAccountNum: string;
  mainBankCode: string

}

const WithdrawalModal: React.FC<ModalProps> = ({
  openWithdrawalModal,
  close,
  accountData,
  mainAccountNum,
  mainBankCode
}) => {

  const { data: bankList } = useGetBankListQuery({})
  const [initiateWithdrawal, { isLoading, data: response }] = useInitiateWithdrawalMutation()
  const [validate, { isLoading: vallidating, isError: validatingError }] = useGetAccountNameMutation()
  const [transferFrom, setTransferFrom] = useState("Main-account");
  const [accountName, setAccountName] = useState("");
  const [formData, setFormData] = useState({
        source_account_id: "",
        bank_code: mainBankCode,
        account_number: mainAccountNum,
        amount: 0,
        narration: ""
  });
  
  useEffect(() => {
    setFormData((prevFormData) => {
      if (transferFrom === "Main-account") {
        // Attach mainBankCode and mainAccountNum if the account is "Main account"
        return {
          ...prevFormData,
          bank_code: mainBankCode,
          account_number: mainAccountNum
        };
      } else {
        // Set bank_code and account_number to empty if the account is not "Main account"
        return {
          ...prevFormData,
          bank_code: "",
          account_number: ""
        };
      }
    });
  }, [transferFrom, mainBankCode, mainAccountNum]);


  

  useEffect(() => {
    // Check if both bank_code and account_number are available
    if (formData.bank_code && formData.account_number && formData.account_number.length === 10) {
      // Trigger the validate mutation
      validate({
        bank_code: formData.bank_code,
        account_number: formData.account_number
      })
        .unwrap()
        .then((res) => {
          // Handle successful validation
          setAccountName(res?.data?.account_name)
          console.log("Validation successful");

          if (res.status === 400) {
            setAccountName(res?.message)
          }
        })
        .catch((error: any) => {
          // Handle validation failure
          setAccountName("Error validating name")
          console.error("Validation failed", error);
        });
    }
  }, [formData.bank_code, formData.account_number, validate]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'amount' ? parseFloat(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };
  const handleSelectChange = (value: string, fieldName: string) => {
    if (fieldName === "source_account") {
      setTransferFrom(value);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [fieldName]: value,
      }));
    }


  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await initiateWithdrawal(formData).unwrap().then(() => {
        message.success("Withdrawal successful");
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
              htmlFor="account"
              className="text-[#24272C] text-base font-bold"
            >
              Transfer to{" "}
            </label>
            <Select
              placeholder=""
              className="!w-full !h-[40px]"
              id="account"
              value={transferFrom}
              onChange={(value) => handleSelectChange(value, "source_account")}
              options={[
                { value: "Main-account", label: "Main account" },
                { value: "others", label: "others" },
              ]}
            />
          </span>
          <span className="flex flex-col gap-1">
            <label
              htmlFor="account"
              className="text-[#24272C] text-base font-bold"
            >
              Select Sub-account{" "}
            </label>
            <Select
              placeholder=""
              className="!w-full !h-[40px]"
              id="account"
              onChange={(value) => handleSelectChange(value, "source_account_id")}
              options={accountData?.map((bank: any) => ({
                value: bank.id,
                label: bank.account_name,
              }))}
            />
          </span>
          {transferFrom === "others" && (
            <>
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
                  maxLength={10}
                  className="w-full rounded-[5px] px-[8px] pr-[16px] h-[50px] text-[14px] border border-[#E9EBEB]"
                  required
                />
                <p className={`text-[#515B6F] text-[14px] ${validatingError ? "text-red-600" : ""}`}>
                  {
                    vallidating ? <LoadingOutlined style={{ fontSize: 24 }} spin /> : accountName
                  }

                </p>
              </span>
            </>
          )}
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
              {isLoading ?
                <LoadingOutlined style={{ fontSize: 24 }} spin />
                :
                "Withdraw"
              }
            </button>
          </span>
        </form>
      </div>
    </Modal>
  );
};

export default WithdrawalModal;
