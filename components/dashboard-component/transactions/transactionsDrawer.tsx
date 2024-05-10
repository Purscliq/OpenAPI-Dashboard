import React from "react";
import { Drawer } from "antd";

interface TransactionDrawerProps {
  open: boolean;
  onClose: () => void;
  data: any; 
}

const TransactionDrawer: React.FC<TransactionDrawerProps> = ({
  open,
  onClose,
  data,
}) => {
  // Extract data from recordData or provide default values
  const {
    amount = 0,
    created_at = "",
    customer_name = "",
    bank_name = "",
    account_number = "",
    narration = "",
  } = data || {};

  return (
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
        <div className="bg-slate-100 h-[150px] w-full flex flex-col justify-center items-center">
          <h1 className="font-bold text-3xl text-[#0AA07B]">{`+NGN ${amount}`}</h1>
          <p className="text-xl">{customer_name}</p>
        </div>

        <div>
          <h2 className="font-semibold text-xl">Transaction Information</h2>
        </div>
        <div className="p-4 border rounded-md space-y-6 border-[#FAFAFA]">
          <div className="w-full flex justify-between">
            <span>Amount</span>
            <span className="font-bold">{`+NGN ${amount}`}</span>
          </div>

          <div className="w-full flex justify-between">
            <span>Date</span>
            <span>{new Date(created_at).toLocaleString()}</span>
          </div>

          {/* <div className="w-full flex justify-between">
            <span>Counterparty</span>
            <span>{customer_name}</span>
          </div> */}

          <div className="w-full flex justify-between">
            <span>Bank Name</span>
            <span>{bank_name}</span>
          </div>

          <div className="w-full flex justify-between">
            <span>Account Number</span>
            <span>{account_number}</span>
          </div>

          <div className="w-full flex justify-between">
            <span>Narration</span>
            <span>{narration}</span>
          </div>
          <hr />

          <div className="w-full">
            <h4 className="font-bold text-md">Transaction Memo</h4>
            <p>{narration}</p>
          </div>
        </div>
        <button className="w-full text-center h-[50px] bg-black text-white rounded mb-4 font-semibold">
          Download Receipt
        </button>
        <button className="w-full text-center h-[50px] bg-white text-black border border-slate-200 rounded font-semibold">
          Report Transaction
        </button>
      </div>
    </Drawer>
  );
};

export default TransactionDrawer;
