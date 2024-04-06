import { Input, Modal } from "antd";
import React from "react";
import { CustomButton as Button } from "@/lib/AntdComponents";
import { CustomSelect as Select } from "@/lib/AntdComponents";
import { FaRegCopy } from "react-icons/fa";
const FundModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered={true}
    >
      <div className=" flex flex-col">
        <h2 className="text-2xl font-bold mb-1 text-center">Fund Account</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter the details to fund this account
        </p>
        <div className="mt-5 space-y-4">
          <form className="w-full space-y-8 mt-4">
            <div className="mb-4">
              <label className="block text-black text-sm font-semibold mb-2">
                Select Account
              </label>
              <Select
                className="!w-full"
                placeholder="Account"
                options={[
                  { value: "individual", label: "Individual" },
                  { value: "business", label: "Business" },
                  { value: "enterprise", label: "Enterprise" },
                  { value: "limited liability", label: "Limited Liability" },
                ]}
              />
            </div>
            <div className="col-span-6 flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="amount"
                className="block text-sm font-semibold text-gray-700"
              >
                Amount
              </label>

              <Input
                id="amount"
                required
                type="amount"
                placeholder="Enter your amount"
                name="amount"
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="col-span-6 flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="narration"
                className="block text-sm font-semibold text-gray-700"
              >
                Narration
              </label>

              <Input
                id="narration"
                required
                type="narration"
                placeholder="Enter your narration"
                name="narration"
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <Button type="primary" className="!h-[3rem] !w-full  !bg-Primary">
              Fund Transfer
            </Button>
          </form>{" "}
        </div>{" "}
      </div>
    </Modal>
  );
};

export default FundModal;
