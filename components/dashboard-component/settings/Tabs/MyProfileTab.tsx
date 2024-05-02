import React, { useEffect, useState } from "react";
import {
  CustomInput as Input,
  CustomPasswordInput as PasswordInput,
} from "@/lib/AntdComponents";
import { useProfileQuery } from "@/services/users/index.service";
import {
  useChangePasswordMutation,
  useDisable2faMutation,
  useValidate2faMutation,
} from "@/services/auth/index.service";
import { message } from "antd";
import { passwordSchema } from "@/lib/PasswordSchema";
import { LoadingOutlined } from "@ant-design/icons";
import Image from "next/image";
import OTPInput from "react-otp-input";

const MyProfileTab = () => {
  const [formData, setFormData] = useState({
    password: "",
    old_password: "",
  });
  const [validationError, setValidationError] = useState("");

  const { data: user } = useProfileQuery({});
  const [disabled, { isLoading }] = useDisable2faMutation();
  const [changePassword, { isLoading: ischanging }] =
    useChangePasswordMutation();
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  useEffect(() => {
    setIs2FAEnabled(user?.data?.two_fa_validated  || false);
  }, [user]);

  const handleDisable2FA = () => {
    disabled({})
      .unwrap()
      .then((res) => {
        setIs2FAEnabled(false);
        message.success(
          "Two-factor authentication has been successfully disabled."
        );
      })
      .catch((err) => {
        message.error(err?.data?.message || "Something went wrong");
      });
  };
  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password")
      passwordSchema
        .validate({ password: e.target?.value })
        .then(() => setValidationError(""))
        .catch((error) => setValidationError(error.message));
    setFormData((prevState) => ({
      ...prevState,
      [e.target?.name]: e.target?.value,
    }));
  };
  const handleUpdatePass = () => {
    if (!validationError) {
      changePassword({ ...formData })
        .unwrap()
        .then((res) => {
          console.log(res);
          message.success("Password updated successfully");
        })
        .catch((err) => {
          message.error(err?.data?.message || "Something went wrong");
        });
    }
  };

  const [validate2FA, { isLoading: isValidating }] = useValidate2faMutation({});

  const [otp, setOtp] = useState("");
  const handleverfifyOtp = () => {
    validate2FA({ code: otp })
      .unwrap()
      .then((res) => {
        console.log(res);
        setIs2FAEnabled(true);
        message.success("2FA Activated");
      })
      .catch((err) => {
        console.log(err);
        message.error(
          message.error(err?.data?.message) || "something went wrong"
        );
      });
  };

  let qrCode;

  if (typeof window !== "undefined") {
    qrCode = sessionStorage.getItem("qr") || "";
  }

  return (
    <section className="bg- py-4 px-0 space-y-4">
      <div className="border-b pb-2">
        <p className="font-semibold text-base">Your Profile</p>
        <p className="font-normal text-base text-[#7C8493]">
          This is personal information that you can update anytime.
        </p>
      </div>

      <form className="">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8 pb-4 border-b">
          <div className="md:col-span-3">
            <p className="font-semibold text-base">Personal Details</p>
          </div>
          <div className="md:col-span-5 space-y-4  md:mr-16 lg:mr-24">
            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="FirstName"
                className="block text-sm font-semibold text-gray-700"
              >
                First Name
              </label>

              <Input
                type="text"
                id="FirstName"
                name="first name"
                value={user?.data?.first_name}
                disabled
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="LastName"
                className="block text-sm font-semibold text-gray-700"
              >
                Last Name
              </label>

              <Input
                type="text"
                id="LastName"
                name="last name"
                value={user?.data?.last_name}
                disabled
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[0.3rem] w-full">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700"
              >
                Email
              </label>

              <Input
                type="email"
                id="email"
                name="email"
                value={user?.data?.email}
                disabled
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-gray-700"
              >
                Phone
              </label>

              <Input
                type="tel"
                id="phone"
                name="phone"
                disabled
                value={user?.data?.phone_number}
                className="p-2 border w-full rounded-md  bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-8 gap-8 py-4 border-b">
          <div className="md:col-span-3">
            <span className="flex flex-col gap-2">
              <p className="font-semibold text-base">New Password</p>
              <p className="font-normal text-base text-[#7C8493]">
                Manage your password to make sure it is safe
              </p>
            </span>
          </div>
          <form className="md:col-span-5 space-y-4 md:mr-16 lg:mr-24">
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Old Password
              </label>
              <PasswordInput
                id="oldPassword"
                name="old_password"
                placeholder="Enter old password"
                value={formData.old_password}
                onChange={handlechange}
                required
                className="p-2 border w-full rounded-md bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-[0.3rem]">
              <label
                htmlFor="newPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                New Password
              </label>
              <PasswordInput
                id="newPassword"
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handlechange}
                required
                className="p-2 border w-full rounded-md bg-white text-sm text-gray-700 shadow-sm"
              />
              {formData.password && validationError && (
                <p className="text-red-500">{validationError}</p>
              )}
            </div>
            <div className="">
              <div className="mt-8">
                <button
                  disabled={ischanging}
                  onClick={handleUpdatePass}
                  className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  {ischanging ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </form>

      {/* disable 2FA */}
      {is2FAEnabled ? (
        <div className="grid grid-cols-1 md:grid-cols-8 gap-8">
          <div className="md:col-span-3">
            <span className="flex flex-col gap-2">
              <p className="font-semibold text-base">
                Disable your 2FA Authentication
              </p>
              <p className="font-normal text-base text-[#7C8493]">
                Scan the QR code using any authenticator on your phone{" "}
                <span className="font-semibold text-[#515B6F]">
                  (e.g Google Authenticator, Duo Mobile, Authy).
                </span>
              </p>
            </span>
          </div>
          <div className="md:col-span-5 space-y-4  md:mr-16 lg:mr-24">
            <div className="">
              <div className="mt-8 ">
                <button
                  onClick={handleDisable2FA}
                  className="w-full bg-[#F6513B] text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                >
                  Disable
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 md:mt-12 mt-6">
          <div className="bg-white py-4 px-6 shadow-sm rounded-md sm:grid grid-cols-8 gap-12 w-full space-y-4 md:space-y-0">
            <div className="p-2 col-span-3 space-y-6 w-full md:max-w-sm">
              <p className="font-semibold text-base">
                Set Up your 2FA Authentication
              </p>
              <p className="font-normal text-base">
                Scan the QR code using any authenticator on your phone (e.g
                Google Authenticator, Duo Mobile, Authy).
              </p>
              {qrCode && (
                <Image
                  src={qrCode}
                  className=""
                  alt="QR Code"
                  title="QR Code"
                  width={100}
                  height={100}
                />
              )}
            </div>

            <div className="p-2 col-span-5 md:mr-10 lg:mr-20">
              <div className="flex flex-col justify-between gap-4 h-full">
                <div className="flex flex-col gap-4">
                  <p className="font-semibold text-base">
                    Enter the 6 figure confirmation code shown on the app
                  </p>
                  {/* OTP field */}
                  <OTPInput
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
                  <div className=" mt-12">
                    <button
                      type="button"
                      onClick={handleverfifyOtp}
                      className="w-full bg-black text-center text-md rounded-md px-4 py-2 font-medium text-white focus:outline-none"
                    >
                      {isValidating ? (
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
      )}
    </section>
  );
};

export default MyProfileTab;
