import PDF from "@/assets/svg/PDF";
import PNG from "@/assets/svg/PNG";
import React from "react";

const KYCTab = () => {
  return (
    <div className="p-4 py-8 border-y grid grid-cols-1 md:grid-cols-3 md:gap-12 gap-6 text-[14px]">
      <div className="p-4 md:max-w-[300px] rounded-lg bg-[#FBFFF5] border border-[#85BC2C] border-dashed flex flex-col gap-2 justify-center items-center">
        <PDF />
        <p className="text-[#242F57] font-semibold">Utility Bill.pdf</p>
        <span className="flex gap-3 text-[#636E95]">
          <p className="text-[#242F57]">Jan 16, 2020</p>|
          <p className="text-[#242F57]">14.1Mb</p>
        </span>
        <button type="button" className="text-[#1AD48E]">
          View File
        </button>
      </div>

      <div className="p-4 md:max-w-[300px] rounded-lg bg-[#FBFFF5] border border-[#85BC2C] border-dashed flex flex-col gap-2 justify-center items-center">
        <PNG />
        <p className="text-[#242F57] font-semibold">Drivers License.png</p>
        <span className="flex gap-3 text-[#636E95]">
          <p className="text-[#242F57]">Jan 16, 2020</p>|
          <p className="text-[#242F57]">14.1Mb</p>
        </span>
        <button type="button" className="text-[#1AD48E]">
          View File
        </button>
      </div>

      <div className="p-4 md:max-w-[300px] rounded-lg bg-[#FBFFF5] border border-[#85BC2C] border-dashed flex flex-col gap-2 justify-center items-center">
        <PNG />
        <p className="text-[#242F57] font-semibold">Form CAC 7.png</p>
        <span className="flex gap-3 text-[#636E95]">
          <p className="text-[#242F57]">Jan 16, 2020</p>|
          <p className="text-[#242F57]">14.1Mb</p>
        </span>
        <button type="button" className="text-[#1AD48E]">
          View File
        </button>
      </div>
    </div>
  );
};

export default KYCTab;
