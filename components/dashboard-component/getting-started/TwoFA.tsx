"use client";

import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Activate from "./Activate";
import Image from "next/image";

import QR from "@/assets/png/QRCode.png";

const TwoFA = () => {
  const [otp, setOtp] = useState("");

  return (
    <section className="max-w-[1640px] flex flex-col p-4 space-y-6  h-screen overflow-y-scroll">
      <Activate />

      <div className="flex flex-col gap-6 md:mt-12 mt-6">
        <div className="bg-white py-4 px-6 shadow-sm rounded-md sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
          <div className="p-2 col-span-3 space-y-6 w-full md:max-w-sm">
            <p className="font-semibold text-base">
              Set Up your 2FA Authentication
            </p>
            <p className="font-normal text-base">
              Scan the QR code using any authenticator on your phone (e.g Google
              Authenticator, Duo Mobile, Authy).
            </p>
            <Image src={QR} className="" alt="QR Code" title="QR Code" />
          </div>

          <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
            <form className="flex flex-col justify-between gap-4 h-full">
              <div className="flex flex-col gap-4">
                <p className="font-semibold text-base">
                  Enter the 6 figure confirmation code shown on the app
                </p>
                {/* OTP field */}
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span className="md:mx-2 mx:0.5">-</span>}
                  placeholder="000000"
                  renderInput={(props) => (
                    <input
                      {...props}
                      required
                      className="md:!w-[58px] md:h-[58px] !w-[38px] h-[38px] rounded-lg border focus:border-black outline-none text-center text:xl md:text-2xl"
                    />
                  )}
                />
              </div>

              <div className="">
                <div className="flex justify-between gap-4 mt-12">
                  <button
                    type="button"
                    className="w-full text-center text-md rounded-md px-4 py-2 font-medium text-black border border-[#E9EBEB] focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                  >
                    Activate
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoFA;
