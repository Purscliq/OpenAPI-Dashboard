"use client";
import React, { useState } from "react";
import AccountTable from "./AccountTable";
import AccountModal from "./AccountModal";

const Acount = () => {
  const [ModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-[1640px] flex flex-col p-4 space-y-12 overflow-y-scroll">
      <header className="flex flex-col md:flex-row justify-between items-center ">
        <h2 className="text-2xl font-bold"> Sub-Account</h2>

        <div className="flex justify-center items-center space-x-5">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-sm  bg-black hover:bg-black text-white font-light text-sm normal-case"
          >
            <span className="text-lg font-semibold"> +</span> Sub-Account
          </button>
        </div>
      </header>
      <AccountTable />
      <AccountModal open={ModalOpen} setOpen={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Acount;
