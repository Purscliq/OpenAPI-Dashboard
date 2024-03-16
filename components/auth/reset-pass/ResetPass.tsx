"use client";
import React, { ChangeEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CustomPasswordInput as PasswordInput } from "@/lib/AntdComponents";
import { Form, message } from "antd";
import Image from "next/image";
import GradientBg from "@/assets/png/side-left.png";
import Hands from "@/assets/png/handshake-img.png";
import InfoIcon from "@/assets/svg/InfoIcon";
import { BiChevronLeft } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { LoadingOutlined } from "@ant-design/icons";
import { useResetPasswordMutation } from "@/services/auth/index.service";
import { passwordSchema } from "@/lib/PasswordSchema";
const ResetPass = () => {
  const { replace } = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const initialState = {
    password: "",
    password2: "",
    email: "",
    ip: "",
    password_reset_token: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [validationError, setValidationError] = useState("");
  const [confirmValidationError, setConfirmValidationError] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const ip = "11234532";
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    setFormData((prev) => ({
      ...prev,
      ip: ip,
      email: email || "",
      password_reset_token: token || "",
    }));
  }, [searchParams]);
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === "password")
      passwordSchema
        .validate({ password: e.target?.value })
        .then(() => setValidationError(""))
        .catch((error) => setValidationError(error.message));
    if (e.target.name === "password2" && e.target.value !== formData.password)
      setConfirmValidationError("password must match");
    else if (
      e.target.name === "password2" &&
      e.target.value === formData.password
    )
      setConfirmValidationError("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };

  const handleSubmit = () => {
    if (!validationError && !confirmValidationError) {
      resetPassword(formData)
        .unwrap()
        .then((res) => {
          message.success("password updated");
          setFormData(initialState);
          replace("reset-message");
        })
        .catch((err) => {
          message.error(err?.data?.message);
        });
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-4">
          <Image
            alt="Night"
            src={GradientBg}
            width={40}
            height={100}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block">
            <Image
              alt="Night"
              src={Hands}
              className="h-full w-full object-cover"
            />
            <div className="lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-center text-white sm:text-3xl md:text-4xl">
                Partnership for Business Growth
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididun.
              </p>
            </div>
          </div>
        </section>

        <main className="w-full max-h-screen px-8 py-6 lg:px-4 lg:py-2 lg:col-span-7 xl:col-span-8">
          <div className="w-full flex flex-col justify-between gap-10 md:h-[calc(100%-.5rem)]">
            {/* header */}
            <div className="md:flex justify-between gap-8">
              <Link href="/" className="hover:underline">
                <span>
                  {" "}
                  <BiChevronLeft className="w-6 h-6 inline-block" />
                </span>
                Return Home
              </Link>
              <span className="block">
                Not a member yet? {""}
                <Link
                  href="/signup"
                  className="text-gray-700 underline font-semibold uppercase"
                >
                  JOIN NOW
                </Link>
              </span>
            </div>
            {/* end of header */}

            <div className="max-w-xl lg:max-w-3xl mx-auto">
              <div className="relative block lg:hidden">
                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Partnership for Business Growth
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididun.
                </p>
              </div>

              <div className="text-center mt-10 lg:mt-0 space-y-2">
                <h2 className="text-3xl uppercase font-semibold">
                  PASSWORD RESET{" "}
                </h2>
                <p className="text-2xl uppercase">ENTER NEW PASSWORD </p>
              </div>
              {/* Form for password reset */}
              <Form
                onFinish={handleSubmit}
                className="!mt-12 grid grid-cols-6 gap-5"
              >
                <div className="col-span-6 flex flex-col items-start justify-start gap-[0.3rem]">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    New Password
                  </label>

                  <PasswordInput
                    id="password"
                    placeholder="Enter Password"
                    type="password"
                    required
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                  />
                  {formData.password && validationError && (
                    <p className="text-red-500">{validationError}</p>
                  )}
                </div>
                <div className="col-span-6 flex flex-col items-start justify-start gap-[0.3rem]">
                  <label
                    htmlFor="password2"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Confirm Password
                  </label>

                  <PasswordInput
                    id="password2"
                    placeholder="Enter Password"
                    type="password"
                    required
                    value={formData.password2}
                    name="password2"
                    onChange={handleChange}
                  />
                  {formData.password2 && confirmValidationError && (
                    <p> Password must match</p>
                  )}
                </div>

                <div className="col-span-6 space-y-2 sm:items-center sm:gap-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-between w-full bg-black px-12 text-left py-6 text-md font-medium text-white focus:outline-none"
                  >
                    Continue
                    <span>
                      {isLoading ? (
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      ) : (
                        <BsArrowRight className="h-5 w-5" />
                      )}
                    </span>
                  </button>
                </div>
              </Form>

              <div className="text-center mt-10">
                Remember your password? {""}
                <Link href="/" className="hover:underline">
                  Login
                </Link>
              </div>
            </div>

            {/* footer */}
            <div className="lg:flex justify-between gap-8 text-[#9E9E9E] space-y-2 lg:space-y-0 ">
              {/* lg:mt-40 mt-0 */}
              <p className="text-sm">
                Copyright 2021 - 2022 PursFI Inc. All rights Reserved
              </p>

              <Link href="/login" className=" text-sm font-medium flex gap-2">
                <InfoIcon />
                Need help?
              </Link>
            </div>
            {/* end of footer */}
          </div>
        </main>
      </div>
    </section>
  );
};

export default ResetPass;
