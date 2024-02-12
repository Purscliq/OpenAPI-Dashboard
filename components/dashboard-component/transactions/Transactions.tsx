import React from "react";
import TransactionsTable from "./TransactionsTable";

const Transactions = () => {
  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <span>
        <h2 className="text-[24px] font-bold mb-1"> Transaction </h2>
      </span>

      <div className="space-y-4">
        <TransactionsTable />
      </div>
    </section>
  );
};

export default Transactions;
