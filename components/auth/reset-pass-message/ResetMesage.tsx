"use client";
import Link from "next/link";
import Image from "next/image";
import GradientBg from "@/assets/png/side-left.png";
import Hands from "@/assets/png/handshake-img.png";
import InfoIcon from "@/assets/svg/InfoIcon";
import { BiChevronLeft } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
const ForgotPass2 = () => {
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
                  PASSWORD CHANGED{" "}
                </h2>
                <p className="text-xl uppercase">
                  Your PASSWORD HAS BEEN CHANGED , kINDLY LOGIN{" "}
                </p>
              </div>
              <div className="mt-12">
                <Link
                  href="/"
                  className="flex justify-between w-full bg-black px-12 text-left py-6 text-md font-medium text-white focus:outline-none"
                >
                  Login
                  <span>
                    <BsArrowRight className="h-5 w-5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* footer */}
            <div className="lg:flex justify-between gap-8 text-[#9E9E9E] space-y-2 lg:space-y-0 ">
              {/* lg:mt-40 mt-0 */}
              <p className="text-sm">
                Copyright 2021 - 2022 PursFI Inc. All rights Reserved
              </p>

              <Link href="/" className=" text-sm font-medium flex gap-2">
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

export default ForgotPass2;
