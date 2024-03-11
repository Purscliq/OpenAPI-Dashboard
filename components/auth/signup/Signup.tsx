"use client";
import "react-phone-input-2/lib/style.css";
import React, { ChangeEventHandler, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  CustomInput as Input,
  CustomPasswordInput as PasswordInput,
  CustomSelect as Select,
} from "@/lib/AntdComponents";
import GradientBg from "@/assets/png/side-left.png";
import Hands from "@/assets/png/handshake-img.png";
import { BiChevronLeft } from "react-icons/bi";
import InfoIcon from "@/assets/svg/InfoIcon";
import { BsArrowRight } from "react-icons/bs";
import PhoneInput from "react-phone-input-2";
import { Form, message } from "antd";
import { passwordSchema } from "@/lib/PasswordSchema";
import {
  useLazyProfileQuery,
  useRegisterMutation,
} from "@/services/auth/index.service";
import { LoadingOutlined } from "@ant-design/icons";

const initailState = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  password: "",
  password2: "",
  business_name: "",
  ip_address: "",
  role_id: 1,
};
const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initailState);
  const [validationError, setValidationError] = useState("");
  const [confirmValidationError, setConfirmValidationError] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const [getUser, { isLoading: isLoadingProfile }] = useLazyProfileQuery();

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
      e.target.value == formData.password
    )
      setConfirmValidationError("");
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };
  const handleRegister = () => {
    if (!validationError && !confirmValidationError) {
      register({ ...formData, ip_address: "11234532" })
        .unwrap()
        .then((res) => {
          getUser({})
            .unwrap()
            .then((res) => {
              message.success("Registration successful");
              const url = `/otp?email=${encodeURIComponent(formData.email)}`;
              router.replace(url);
            });
        })
        .catch((err) => {
          message.error(err?.data?.message || "Something went wrong");
        });
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:h-screen lg:grid-cols-12">
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

        <main className="w-full max-h-screen overflow-y-auto px-8 py-6 lg:px-4 lg:py-2  lg:col-span-7 xl:col-span-8">
          <div className="w-full flex flex-col justify-between h-full lg:max-h-screen">
            <div className="md:flex justify-between gap-8">
              <Link href="/" className="hover:underline">
                <span>
                  {" "}
                  <BiChevronLeft className="w-6 h-6 inline-block" />
                </span>
                Return Home
              </Link>
              <span className="block">
                Already a Member? {""}
                <Link
                  href="/"
                  className="text-gray-700 underline font-semibold uppercase"
                >
                  Log in now
                </Link>
              </span>
            </div>

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

              <div>
                <div className="text-center mt-10 lg:mt-0 space-y-2">
                  <h2 className="text-3xl uppercase font-semibold">
                    CREATE YOUR PURSFI API ACCOUNT
                  </h2>
                  <p className="text-2xl uppercase">
                    SIGN UP and join the partnership{" "}
                  </p>
                </div>

                <Form
                  onFinish={handleRegister}
                  className="!mt-12 !grid !grid-cols-6 !gap-5"
                >
                  <div className="col-span-6 sm:col-span-3 flex flex-col items-start justify-start gap-[0.3rem]">
                    <label
                      htmlFor="FirstName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      First Name
                    </label>

                    <Input
                      id="firstName"
                      required
                      value={formData.first_name}
                      onChange={handleChange}
                      name="first_name"
                      type="text"
                      placeholder="Enter your first name"
                      className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex flex-col items-start justify-start gap-[0.3rem]">
                    <label
                      htmlFor="LastName"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Last Name
                    </label>

                    <Input
                      id="LastName"
                      name="last_name"
                      required
                      value={formData.last_name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter your last name"
                      className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex flex-col items-start justify-start gap-[0.3rem]">
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

                  <div className="col-span-6 sm:col-span-3 flex flex-col items-start justify-start gap-[0.3rem] w-full">
                    <label
                      htmlFor="RegNum"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Registration Number
                    </label>

                    <div className="phone-input-container !w-full">
                      <PhoneInput
                        country={"ng"}
                        containerClass="!w-full"
                        inputClass="phone-input-input !w-full"
                        value={formData.phone_number}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            phone_number: value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="col-span-6  flex flex-col items-start justify-start gap-[0.3rem]">
                    <label
                      htmlFor="business_name"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Business Name
                    </label>

                    <Input
                      type="text"
                      id="business_name"
                      name="business_name"
                      required
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="Enter your business name"
                      className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex flex-col items-start justify-start gap-[0.3rem]">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Enter Password
                    </label>

                    <PasswordInput
                      id="password"
                      placeholder="Enter your password"
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

                  <div className="col-span-6 sm:col-span-3 flex flex-col items-start justify-start gap-[0.3rem]">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Confirm Password
                    </label>

                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Confirm your password"
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

                  <div className="col-span-6  flex flex-col items-start justify-start gap-[0.3rem]">
                    <label
                      htmlFor="APIusage"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      How do you want to use Pursfi Open API
                    </label>

                    <Form.Item
                      name="APIusage"
                      rules={[
                        {
                          required: true,
                          message: "Please select an option",
                        },
                      ]}
                      className="!w-full"
                    >
                      <Select
                        id="APIusage"
                        defaultValue=""
                        options={[
                          { value: "", label: "Select an option" },
                          { value: "Business", label: "Business" },
                          { value: "Personal", label: "Personal" },
                        ]}
                        className=" !w-full rounded-md  !bg-white !text-gray-700 "
                      />
                    </Form.Item>
                  </div>

                  {/* <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <Input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    required
                    className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
              </div> */}

                  <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                      By clicking 'Continue', you acknowledge that you have read
                      and accept the {""}
                      <Link
                        href="#"
                        className="text-gray-700 underline font-medium"
                      >
                        Terms of Service
                      </Link>
                      {""} and {""}
                      <Link
                        href="#"
                        className="text-gray-700 underline font-medium"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>

                  <div className="col-span-6 space-y-2 sm:items-center sm:gap-4">
                    <button className="flex justify-between  w-full  bg-black px-12 text-left py-6 text-md font-medium text-white focus:outline-none">
                      Create an account
                      <span>
                        {" "}
                        {isLoading || isLoadingProfile ? (
                          <LoadingOutlined style={{ fontSize: 24 }} spin />
                        ) : (
                          <BsArrowRight className="h-5 w-5" />
                        )}
                      </span>{" "}
                    </button>
                  </div>
                </Form>
              </div>
            </div>

            {/* footer */}
            <div className="md:flex justify-between gap-8 text-[#9E9E9E] space-y-2 md:space-y-0">
              <p className="text-sm">
                Copyright 2021 - 2022 PursFI Inc. All rights Reserved
              </p>

              <Link href="/" className=" text-sm font-medium flex gap-2">
                <InfoIcon />
                Need help?
              </Link>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Signup;
