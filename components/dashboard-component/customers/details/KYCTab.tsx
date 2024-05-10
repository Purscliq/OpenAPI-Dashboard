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

  const isPDF = (url: string) => {
    const supportedExtensions = ['.png', '.jpg', '.jpeg', '.gif']; // Add more image extensions if needed
    const lowerCaseUrl = url.toLowerCase();
    return supportedExtensions.some(ext => lowerCaseUrl.endsWith(ext));
};


  return (
    <div className="p-4 py-8 border-y grid grid-cols-1 md:grid-cols-3 md:gap-12 gap-6 text-[14px]">
      <div className="p-4 md:max-w-[300px] rounded-lg bg-[#FBFFF5] border border-[#85BC2C] border-dashed flex flex-col gap-2 justify-center items-center">
      { isPDF(kycData?.idCard) ? <PNG /> :  <PDF />}
        <p className="text-[#242F57] font-semibold">{ isPDF(kycData?.idCard) ? 'ID card.png' :'ID card.pdf' }</p>
        <span className="flex gap-3 text-[#636E95]">
          <p className="text-[#242F57]">{formatDate(kycData.updatedAt)}</p>|
          <p className="text-[#242F57]">14.1Mb</p>
        </span>
        {isPDF(kycData.idCard) ? (
          <button type="button" className="text-[#1AD48E]" onClick={() => setVisible(true)}>
            View File
          </button>
        ) : (
          <a href={kycData.idCard} download className="text-[#1AD48E]">
            Download File
          </a>
        )}
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
      { isPDF(kycData?.utilityBill) ? <PNG /> :  <PDF />}
        
        <p className="text-[#242F57] font-semibold">{ isPDF(kycData?.utilityBill) ? 'utility Bill.png' : 'utility Bill.pdf'}</p>
        <span className="flex gap-3 text-[#636E95]">
          <p className="text-[#242F57]">{formatDate(kycData.updatedAt)}</p>|
          <p className="text-[#242F57]">14.1Mb</p>
        </span>
        {isPDF(kycData.utilityBill) ? (
          <button type="button" className="text-[#1AD48E]" onClick={() => setVisible1(true)}>
            View File
          </button>
        ) : (
          <a href={kycData.utilityBill} download className="text-[#1AD48E]">
            Download File
          </a>
        )}
        <Image
          width={200}
          style={{ display: 'none' }}
          src={kycData?.utilityBill}
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

      {
        /**
         * <div className="p-4 md:max-w-[300px] rounded-lg bg-[#FBFFF5] border border-[#85BC2C] border-dashed flex flex-col gap-2 justify-center items-center">
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
         */
      }
    </div>
  );
};

export default KYCTab;
