"use client";

import React, { useState } from "react";
import { GrCircleInformation } from "react-icons/gr";
import { MdCancelPresentation } from "react-icons/md";

const Activate = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Hide the component if isVisible is false
  }

  return (
    <div className="bg-black rounded-md py-4 px-6 text-white text-base md:flex justify-between gap-6 space-y-4 md:space-y-0">
      <div className="flex gap-4">
        <button type="button" className="" title="Info">
          <GrCircleInformation className="w-6 h-6" />
        </button>
        <span className="flex flex-col gap-2">
          <p className="font-bold">You’re currently in Sandbox mode</p>
          <p className="">
            Activate your business to start using Pursfi Open API live mode
          </p>
        </span>
      </div>
      <div className="flex gap-6">
        <button
          type="button"
          className="text-black bg-[#F9FFFF] py-2 font-semibold px-6 rounded-md"
        >
          Activate Business
        </button>
        <button type="button" onClick={handleClose} title="Close">
          <MdCancelPresentation className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Activate;
