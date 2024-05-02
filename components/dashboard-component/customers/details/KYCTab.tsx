import PDF from "@/assets/svg/PDF";
import PNG from "@/assets/svg/PNG";
import React, { useState } from "react";
import { Button, Image, InputNumber } from 'antd';
import { formatDate } from "@/helpers/dateFormat";

interface KYCData {
  kycData: {
    idCard: string;
    utilityBill: string;
    updatedAt: string
  }

}

const KYCTab: React.FC<KYCData> = ({ kycData }) => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  const [scaleStep, setScaleStep] = useState(0.5);
  return (
    <div className="p-4 py-8 border-y grid grid-cols-1 md:grid-cols-3 md:gap-12 gap-6 text-[14px]">
      <div className="p-4 md:max-w-[300px] rounded-lg bg-[#FBFFF5] border border-[#85BC2C] border-dashed flex flex-col gap-2 justify-center items-center">
        <PDF />
        <p className="text-[#242F57] font-semibold">Utility Bill.pdf</p>
        <span className="flex gap-3 text-[#636E95]">
          <p className="text-[#242F57]">{formatDate(kycData.updatedAt)}</p>|
          <p className="text-[#242F57]">14.1Mb</p>
        </span>
        <button type="button" className="text-[#1AD48E]" onClick={() => setVisible(true)}>
          View File
        </button>
        <Image
          width={200}
          style={{ display: 'none' }}
          src={kycData?.idCard}
          preview={{
            visible,
            scaleStep,
            src: kycData?.idCard,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />
      </div>

      <div className="p-4 md:max-w-[300px] rounded-lg bg-[#FBFFF5] border border-[#85BC2C] border-dashed flex flex-col gap-2 justify-center items-center">
        <PNG />
        <p className="text-[#242F57] font-semibold">Drivers License.png</p>
        <span className="flex gap-3 text-[#636E95]">
          <p className="text-[#242F57]">{formatDate(kycData.updatedAt)}</p>|
          <p className="text-[#242F57]">14.1Mb</p>
        </span>
        <button type="button" className="text-[#1AD48E]" onClick={() => setVisible1(true)}>
          View File
        </button>

        <Image
          width={200}
          style={{ display: 'none' }}
          src={kycData?.idCard}
          preview={{
            visible: visible1,
            scaleStep,
            src: kycData?.utilityBill,
            onVisibleChange: (value) => {
              setVisible1(value);
            },
          }}
        />
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
