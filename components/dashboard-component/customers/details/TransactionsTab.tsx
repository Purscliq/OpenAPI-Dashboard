import React from "react";
import TransactionsTable from "./TransactionsTable";

interface props {
  id: string | null
}
const TransactionsTab = ({id}: props) => {
  return (
    <div className="py-4 border-y">
      <TransactionsTable id={id} />
    </div>
  );
};

export default TransactionsTab;
