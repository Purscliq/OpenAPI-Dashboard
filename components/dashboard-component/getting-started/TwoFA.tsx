"use client";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import Activate from "./Activate";
import Image from "next/image";
import { useValidate2faMutation } from "@/services/auth/index.service";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const TwoFA = ({ QRcode }: { QRcode: string }) => {
  const [validate2FA, { isLoading }] = useValidate2faMutation({});
  const { replace } = useRouter();

  const [otp, setOtp] = useState("");
  const handleSubmit = () => {
    validate2FA({ code: otp })
      .unwrap()
      .then((res) => {
        console.log(res);
        message.success("2FA Activated");
        replace("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        message.error(
          message.error(err?.data?.message) || "something went wrong"
        );
      });
  };
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
            <Image
              src={QRcode}
              className=""
              alt="QR Code"
              title="QR Code"
              width={100}
              height={100}
            />
          </div>

          <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
            <div className="flex flex-col justify-between gap-4 h-full">
              <div className="flex flex-col gap-4">
                <p className="font-semibold text-base">
                  Enter the 6 figure confirmation code shown on the app
                </p>
                {/* OTP field */}
                <OtpInput
                  value={otp}
                  onChange={(otp) => setOtp(otp)}
                  numInputs={6}
                  renderSeparator={<span className="md:mx-2 mx-0.5">-</span>}
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
                    onClick={() => replace("/getting started")}
                    className="w-full text-center text-md rounded-md px-4 py-2 font-medium text-black border border-[#E9EBEB] focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                  >
                    {isLoading ? (
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    ) : (
                      "Activate"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoFA;
