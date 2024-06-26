"use client";

import React, { ChangeEventHandler, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CustomInput as Input,
  CustomPasswordInput as PasswordInput,
} from "@/lib/AntdComponents";
import Image from "next/image";
import GradientBg from "@/assets/png/side-left.png";
import Hands from "@/assets/png/Light-brown.svg";
import { BiChevronLeft } from "react-icons/bi";
import InfoIcon from "@/assets/svg/InfoIcon";
import { BsArrowRight } from "react-icons/bs";
import { Form, message } from "antd";
import { useLoginMutation } from "@/services/auth/index.service";
import { LoadingOutlined } from "@ant-design/icons";
import { useLazyProfileQuery } from "@/services/users/index.service";

const initailState = {
  email: "",
  password: "",
};
const Login = () => {
  const { replace } = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [getUser, { isLoading: isGettingUser }] = useLazyProfileQuery({});
  const [formData, setFormData] = useState(initailState);

  const handleSubmit = async () => {
    try {
      await login({ ...formData }).unwrap();
      const res = await getUser({});
      message.success("Login successful");
      if (res?.data?.data?.two_fa_validated === true) {
        replace("/login-2fa");
      } else {
        replace("/getting-started");
      }
    } catch (err: any) {
      console.log(err);
      message.error(err?.data?.message || "something went wrong");
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };
  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex flex-col h-32 items-end bg-gray-900 lg:col-span-4 lg:h-full xl:col-span-4">
          <Image
            alt="Night"
            src={GradientBg}
            width={40}
            height={100}
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className=" flex justify-center w-full">
            <h1 className=" absolute top-10 text-white sm:text-3xl md:text-6xl font-extrabold">
              PursFI
            </h1>
          </div>

          <div className="hidden h-full w-full  lg:relative lg:block">
            <Image
              alt="Night"
              src={Hands}
              className=" object-cover w-full mt-[-80px]"
            />
         
            <div className="lg:p-12 mt-[-100px] text-center">
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

        <main className="w-full max-h-screen px-8 py-6 lg:px-4 lg:py-2 lg:col-span-8 xl:col-span-8">
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
                  WELCOME BACK EXCLUSIVE MEMBER
                </h2>
                <p className="text-2xl uppercase">LOG IN TO CONTINUE</p>
              </div>
              <Form
                onFinish={handleSubmit}
                className="!mt-12 !grid !grid-cols-6 !gap-5"
              >
                <div className="col-span-6 flex flex-col items-start justify-start gap-[0.3rem]">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Work Email
                  </label>

                  <Input
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 flex flex-col items-start justify-start gap-[0.3rem]">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Password
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
                </div>

                <div className="col-span-6 space-y-2 sm:items-center sm:gap-4">
                  <button className="flex justify-between  w-full  bg-black px-12 text-left py-6 text-md font-medium text-white focus:outline-none">
                    Proceed to my Account
                    <span>
                      {isLoading || isGettingUser ? (
                        <LoadingOutlined style={{ fontSize: 24 }} spin />
                      ) : (
                        <BsArrowRight className="h-5 w-5" />
                      )}
                    </span>{" "}
                  </button>
                </div>
              </Form>

              <div className="text-center mt-10">
                <Link href="/forgot-password" className="hover:underline">
                  Having Issues with your Password?
                </Link>
              </div>
            </div>

            {/* footer */}
            <div className=" lg:flex justify-between gap-8 text-[#9E9E9E] space-y-2 lg:space-y-0 ">
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

export default Login;
